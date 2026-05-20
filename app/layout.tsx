import "./globals.css";

export const metadata = {
  title: "BuildIQ",
  description:
    "Construction ERP Platform",
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

          {/* SIDEBAR */}
          <div className="w-64 bg-[#111827] p-6 border-r border-gray-800">

            {/* LOGO */}
            <div className="mb-10">

              <h1 className="text-3xl font-bold text-cyan-400">

                BuildIQ

              </h1>

              <p className="text-gray-500 text-sm mt-1">

                Construction ERP

              </p>

            </div>

            {/* NAVIGATION */}
            <div className="space-y-3">

              <a
                href="/"
                className="block bg-[#1e293b] hover:bg-cyan-500 hover:text-black px-4 py-3 rounded-xl transition"
              >
                Dashboard
              </a>

              <a
                href="/projects"
                className="block bg-[#1e293b] hover:bg-cyan-500 hover:text-black px-4 py-3 rounded-xl transition"
              >
                Projects
              </a>

              <a
                href="/login"
                className="block bg-[#1e293b] hover:bg-red-500 px-4 py-3 rounded-xl transition"
              >
                Login
              </a>

            </div>

          </div>

          {/* MAIN CONTENT */}
          <div className="flex-1 p-10 overflow-auto">

            {children}

          </div>

        </div>

      </body>

    </html>
  );
}