export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to Cartzy
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Your e-commerce platform is running successfully!
        </p>
        <a
          href="/products"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Browse Products
        </a>
      </div>
    </div>
  );
}
