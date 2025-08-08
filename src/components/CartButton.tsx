"use client"

import { useState, useEffect } from "react"
import { ShoppingBagIcon } from "@heroicons/react/24/outline"
import { ShoppingCart } from "./ShoppingCart"

interface CartButtonProps {
  userId?: string
}

export function CartButton({ userId }: CartButtonProps) {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [cartItemCount, setCartItemCount] = useState(0)

  useEffect(() => {
    const loadCartItemCount = async () => {
      if (userId) {
        // Load from database for logged-in users
        try {
          const response = await fetch('/api/cart')
          if (response.ok) {
            const data = await response.json()
            const count = data.reduce((total: number, item: { quantity: number }) => total + (item.quantity || 0), 0)
            setCartItemCount(count)
          }
        } catch (error) {
          console.error('Error loading cart count:', error)
        }
      } else {
        // Load from localStorage for non-logged-in users
        const savedCart = localStorage.getItem('cartzy-cart')
        if (savedCart) {
          const cartItems = JSON.parse(savedCart)
          const count = cartItems.reduce((total: number, item: { quantity: number }) => total + (item.quantity || 0), 0)
          setCartItemCount(count)
        }
      }
    }
    
    loadCartItemCount()
  }, [userId])

  return (
    <>
      <button
        onClick={() => setIsCartOpen(true)}
        className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
      >
        <ShoppingBagIcon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
        {cartItemCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {cartItemCount}
          </span>
        )}
      </button>

      <ShoppingCart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        userId={userId}
      />
    </>
  )
} 