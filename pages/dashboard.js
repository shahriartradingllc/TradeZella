import { useEffect, useState } from "react";
import { auth, db } from "../lib/firebase";
import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { collection, addDoc, query, onSnapshot } from "firebase/firestore";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [trades, setTrades] = useState([]);
  const provider = new GoogleAuthProvider();

  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsubAuth();
  }, []);

  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, "trades_" + user.uid));
    const unsub = onSnapshot(q, (snap) => {
      setTrades(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    return () => unsub();
  }, [user]);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (err) {
      console.error("Login error", err);
      alert("Login failed: " + err.message);
    }
  };

  const handleAddTrade = async () => {
    if (!user) return alert("Please sign in first");
    try {
      await addDoc(collection(db, "trades_" + user.uid), {
        createdAt: new Date().toISOString(),
        symbol: "AAPL",
        qty: 1,
        note: "sample trade"
      });
    } catch (err) {
      console.error(err);
      alert("Failed to add trade");
    }
  };

  return (
    <div className="min-h-screen container mx-auto px-6 py-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <div>
          {user ? (
            <>
              <span className="mr-4">Hi, {user.displayName}</span>
              <button className="px-3 py-1 border rounded" onClick={() => signOut(auth)}>Sign out</button>
            </>
          ) : (
            <button className="px-3 py-1 bg-indigo-600 text-white rounded" onClick={handleLogin}>Sign in with Google</button>
          )}
        </div>
      </div>

      <div className="mt-6">
        <button className="px-4 py-2 bg-green-500 text-white rounded" onClick={handleAddTrade}>Add sample trade</button>
      </div>

      <div className="mt-6">
        <h3 className="font-semibold">Your Trades</h3>
        <ul className="mt-2">
          {trades.map(t => (
            <li key={t.id} className="border p-3 rounded my-2">
              <div><strong>{t.symbol}</strong> — {t.qty} — {new Date(t.createdAt).toLocaleString()}</div>
              <div className="text-sm text-gray-600">{t.note}</div>
            </li>
          ))}
          {trades.length === 0 && <li className="text-gray-500">No trades yet.</li>}
        </ul>
      </div>
    </div>
  );
}
