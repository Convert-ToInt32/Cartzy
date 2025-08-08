"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline"

interface FeaturedProduct {
  id: string
  name: string
  price: number
  description: string
  images: string[]
  category: {
    name: string
  }
}

interface FeaturedCarouselProps {
  products: FeaturedProduct[]
}

export function FeaturedCarousel({ products }: FeaturedCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  // Auto-slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % products.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [products.length])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % products.length)
  }

  if (!products.length) return null

  return (
    <div className="relative w-full h-96 bg-gradient-to-r from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 rounded-xl overflow-hidden">
      {/* Carousel Container */}
      <div className="relative h-full">
        {products.map((product, index) => (
          <div
            key={product.id}
            className={`absolute inset-0 transition-all duration-500 ease-in-out ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="flex h-full">
              {/* Product Image */}
              <div className="w-1/2 relative">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/20" />
              </div>
              
              {/* Product Info */}
              <div className="w-1/2 p-8 flex flex-col justify-center">
                <div className="mb-4">
                  <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900 px-3 py-1 rounded-full">
                    {product.category.name}
                  </span>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  {product.name}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6 line-clamp-3">
                  {product.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-4xl font-bold text-gray-900 dark:text-white">
                    ${product.price}
                  </span>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
                    Shop Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-800 p-2 rounded-full shadow-lg transition-all"
      >
        <ChevronLeftIcon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
      </button>
      
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-800 p-2 rounded-full shadow-lg transition-all"
      >
        <ChevronRightIcon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {products.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentIndex
                ? "bg-blue-600 scale-125"
                : "bg-white/60 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </div>
  )
} 