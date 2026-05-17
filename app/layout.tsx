import "./globals.css";

export const metadata = {
  title: "BuildIQ",
  description: "Construction Management Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#0f172a] text-white">

        <div className="flex min-h-screen">

          {/* Sidebar */}
          <aside className="w-64 bg-[#111827] p-6 border-r border-gray-800">

            <h1 className="text-3xl font-bold mb-10 text-cyan-400">
              BuildIQ
            </h1>

            <nav className="space-y-4">

              <a
                href="/"
                className="block hover:bg-gray-800 px-4 py-3 rounded-xl"
              >
                Dashboard
              </a>

              <a
                href="/projects"
                className="block hover:bg-gray-800 px-4 py-3 rounded-xl"
              >
                Projects
              </a>

              <a
                href="/boq"
                className="block hover:bg-gray-800 px-4 py-3 rounded-xl"
              >
                BOQ
              </a>

              <a
                href="#"
                className="block hover:bg-gray-800 px-4 py-3 rounded-xl"
              >
                Estimation
              </a>

              <a
                href="#"
                className="block hover:bg-gray-800 px-4 py-3 rounded-xl"
              >
                Tenders
              </a>

              <a
                href="#"
                className="block hover:bg-gray-800 px-4 py-3 rounded-xl"
              >
                Reports
              </a>

            </nav>

          </aside>

          {/* Page Content */}
          <main className="flex-1 p-8">
            {children}
          </main>

        </div>

      </body>
    </html>
  );
}