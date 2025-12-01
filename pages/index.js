import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Zella-Clone</h1>
          <nav>
            <Link href="/dashboard" className="px-4">
              Dashboard
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-4xl font-extrabold">Track. Analyze. Improve.</h2>
            <p className="mt-4 text-lg">
              A lightweight trading journal for your personal use — built with
              Next.js + Firebase.
            </p>

            <div className="mt-6">
              <Link
                href="/dashboard"
                className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-md"
              >
                Get Started
              </Link>
            </div>
          </div>

          <div>
            <div className="bg-gradient-to-br from-white to-gray-100 border rounded-lg p-8 shadow">
              <p className="text-sm text-gray-600">
                Sample analytics, reports and quick metrics (replace with your
                components)
              </p>
              {/* এখানে চার্ট / কাস্টম উপাদান বসবে */}
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t">
        <div className="container mx-auto px-6 py-6 text-sm text-gray-600">
          © {new Date().getFullYear()} Personal Zella Clone
        </div>
      </footer>
    </div>
  );
}
