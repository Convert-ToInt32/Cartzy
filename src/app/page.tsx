import { SignInButton } from "@/components/auth/SignInButton";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">C</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Cartzy</h1>
        </div>
        <SignInButton />
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Welcome to
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Cartzy</span>
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Your modern e-commerce platform with secure OAuth authentication, 
            powered by PostgreSQL and built for scale.
          </p>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <span className="text-2xl">🔐</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Secure Authentication
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                OAuth 2.0 + OpenID Connect with Google & GitHub integration
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <span className="text-2xl">🛍️</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Full E-commerce
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Products, cart, orders, reviews - everything you need to sell online
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Modern Stack
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Next.js 15, TypeScript, Prisma ORM, PostgreSQL database
              </p>
            </div>
          </div>

          {/* Status */}
          <div className="mt-16 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              System Status
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-300">Database</span>
                <span className="flex items-center gap-1 text-green-600">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  Connected (PostgreSQL)
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-300">Authentication</span>
                <span className="flex items-center gap-1 text-green-600">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  Ready (NextAuth.js)
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-300">Tables Created</span>
                <span className="flex items-center gap-1 text-green-600">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  11 Tables (Users, Products, Orders, etc.)
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 text-center text-gray-600 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700">
        <p>Built with Next.js, TypeScript, Prisma & PostgreSQL</p>
      </footer>
    </div>
  );
}
