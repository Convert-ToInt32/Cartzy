"use client"
import React from "react"

import { useState } from "react"
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"

interface SearchBarProps {
  onSearch: (query: string) => void
  onCategoryFilter: (category: string) => void
  categories: { id: string; name: string }[]
}

export function SearchBar({ onSearch, onCategoryFilter, categories }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(searchQuery)
  }

  const quickFilters = [
    { name: "All Products", value: "all" },
    { name: "Under $100", value: "under-100" },
    { name: "Under $500", value: "under-500" },
    { name: "In Stock", value: "in-stock" },
    { name: "New Arrivals", value: "new" },
  ]

  return (
    <div className="w-full">
      {/* Compact Search Bar */}
      <form onSubmit={handleSearch} className="relative mb-4">
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-16 py-2.5 border border-gray-300 dark:border-gray-600 rounded-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-full transition-colors text-xs font-medium"
          >
            Search
          </button>
        </div>
      </form>

      {/* Compact Quick Filters */}
      <div className="mb-4">
        <div className="flex flex-wrap gap-1.5">
          {quickFilters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => onCategoryFilter(filter.value)}
              className="px-2.5 py-1 text-xs bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-full transition-colors"
            >
              {filter.name}
            </button>
          ))}
        </div>
      </div>

      {/* Compact Category Filters */}
      <div className="mb-4">
        <div className="flex flex-wrap gap-1.5">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryFilter(category.name.toLowerCase())}
              className="px-2.5 py-1 text-xs bg-blue-100 dark:bg-blue-900 hover:bg-blue-200 dark:hover:bg-blue-800 text-blue-700 dark:text-blue-300 rounded-full transition-colors"
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
} 