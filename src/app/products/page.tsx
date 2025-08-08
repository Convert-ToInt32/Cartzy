"use client"

import { ThemeToggle } from "@/components/ThemeToggle";
import { SignInButton } from "@/components/auth/SignInButton";
import { CartButton } from "@/components/CartButton";
import { Notification } from "@/components/Notification";
import { SearchBar } from "@/components/SearchBar";
import { FeaturedCarousel } from "@/components/FeaturedCarousel";
import Image from "next/image";
import { LoadingSpinner, ProductCardSkeleton, CategorySkeleton } from "@/components/LoadingSpinner";
import { useEffect, useState } from "react";

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  images: string[];
  stock: number;
  category: {
    id: string;
    name: string;
  };
}

interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  products: Product[];
}

export default function ProductsPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [filteredCategories, setFilteredCategories] = useState<Category[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/categories');
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data = await response.json();
        setCategories(data);
        setFilteredCategories(data);
        
        // Set featured products (first 3 products from each category)
        const featured = data.flatMap((category: Category) => category.products.slice(0, 3)).slice(0, 6);
        setFeaturedProducts(featured);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Filter products based on search and category
  useEffect(() => {
    let filtered = categories;

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = categories.filter((category: Category) => 
        category.name.toLowerCase().includes(selectedCategory.toLowerCase())
      );
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.map((category: Category) => ({
        ...category,
        products: category.products.filter((product: Product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase())
        )
      })).filter((category: Category) => category.products.length > 0);
    }

    setFilteredCategories(filtered);
  }, [categories, searchQuery, selectedCategory]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category);
  };

  if (loading) {
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
          <div className="font-bold text-sm bg-gradient-to-r from-red-400 via-pink-400 to-red-400 bg-clip-text text-transparent animate-pulse">
            🚨 VINCENT SAMAR DEMO - DO NOT DUPLICATE 🚨
          </div>
          <div className="flex items-center gap-4">
            <Notification />
            <CartButton />
            <ThemeToggle />
            <SignInButton />
          </div>
        </header>

        {/* Loading State */}
        <main className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Products
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Loading amazing products...
            </p>
          </div>

          <div className="space-y-12">
            {[...Array(4)].map((_, index) => (
              <div key={index}>
                <CategorySkeleton />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
                  {[...Array(4)].map((_, productIndex) => (
                    <ProductCardSkeleton key={productIndex} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    );
  }

  if (error) {
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
          <div className="font-bold text-sm bg-gradient-to-r from-red-400 via-pink-400 to-red-400 bg-clip-text text-transparent animate-pulse">
            🚨 VINCENT SAMAR DEMO - DO NOT DUPLICATE 🚨
          </div>
          <div className="flex items-center gap-4">
            <Notification />
            <CartButton />
            <ThemeToggle />
            <SignInButton />
          </div>
        </header>

        {/* Error State */}
        <main className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Error Loading Products
            </h1>
            <p className="text-lg text-red-600 dark:text-red-400 mb-4">
              {error}
            </p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>
        </main>
      </div>
    );
  }

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
        <div className="font-bold text-sm bg-gradient-to-r from-red-400 via-pink-400 to-red-400 bg-clip-text text-transparent animate-pulse">
          🚨 VINCENT SAMAR DEMO - DO NOT DUPLICATE 🚨
        </div>
        <div className="flex items-center gap-4">
          <Notification />
          <CartButton />
          <ThemeToggle />
          <SignInButton />
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {/* Search and Filters - Compact */}
        <div className="mb-6">
          <SearchBar
            onSearch={handleSearch}
            onCategoryFilter={handleCategoryFilter}
            categories={categories}
          />
        </div>

        {/* Featured Products Carousel */}
        {featuredProducts.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Featured Products
            </h2>
            <FeaturedCarousel products={featuredProducts} />
          </div>
        )}

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
            Our Products
          </h1>
          <p className="text-base text-gray-600 dark:text-gray-300">
            Discover our amazing collection of products
          </p>
        </div>

        {/* Categories and Products */}
        <div className="space-y-12">
          {filteredCategories.map((category) => (
            <section key={category.id} className="mb-12">
              <div className="mb-6">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {category.name}
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  {category.description}
                </p>
              </div>

                             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                 {category.products.map((product) => (
                   <div
                     key={product.id}
                     className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                   >
                     <div className="aspect-w-16 aspect-h-9">
                                              <Image
                          src={product.images[0]}
                          alt={product.name}
                          width={400}
                          height={300}
                          className="w-full h-48 object-cover"
                        />
                     </div>
                     <div className="p-6">
                       <div className="flex items-center justify-between mb-2">
                         <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded-full">
                           {product.category?.name || 'Unknown'}
                         </span>
                         <span className="text-2xl font-bold text-gray-900 dark:text-white">
                           ${product.price}
                         </span>
                       </div>
                       <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                         {product.name}
                       </h3>
                       <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                         {product.description}
                       </p>
                       <div className="flex items-center justify-between mb-4">
                         <span className="text-sm text-gray-500 dark:text-gray-400">
                           Stock: {product.stock}
                         </span>
                       </div>
                       <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
                         Add to Cart
                       </button>
                     </div>
                   </div>
                 ))}
               </div>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
} 