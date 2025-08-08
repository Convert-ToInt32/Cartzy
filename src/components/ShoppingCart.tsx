"use client"

import { useState, useEffect } from "react"
import { XMarkIcon, TrashIcon, PlusIcon, MinusIcon } from "@heroicons/react/24/outline"
import Image from "next/image"

interface CartItem {
  id: string
  productId: string
  name: string
  price: number
  quantity: number
  image: string
}

interface ShoppingCartProps {
  isOpen: boolean
  onClose: () => void
  userId?: string
}

export function ShoppingCart({ isOpen, onClose, userId }: ShoppingCartProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  // Load cart items on mount
  useEffect(() => {
    const loadCartItems = async () => {
      if (userId) {
        // Load from database for logged-in users
        try {
          const response = await fetch('/api/cart')
          if (response.ok) {
            const data = await response.json()
            setCartItems(data)
          }
        } catch (error) {
          console.error('Error loading cart:', error)
        }
      } else {
        // Load from localStorage for non-logged-in users
        const savedCart = localStorage.getItem('cartzy-cart')
        if (savedCart) {
          setCartItems(JSON.parse(savedCart))
        }
      }
    }
    
    loadCartItems()
  }, [userId])

  const saveCartItems = async (items: CartItem[]) => {
    if (userId) {
      // Save to database for logged-in users
      try {
        await fetch('/api/cart', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ items })
        })
      } catch (error) {
        console.error('Error saving cart:', error)
      }
    } else {
      // Save to localStorage for non-logged-in users
      localStorage.setItem('cartzy-cart', JSON.stringify(items))
    }
  }



  const updateQuantity = async (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId)
      return
    }

    const newItems = cartItems.map(item =>
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    )
    
    setCartItems(newItems)
    await saveCartItems(newItems)
  }

  const removeFromCart = async (itemId: string) => {
    const newItems = cartItems.filter(item => item.id !== itemId)
    setCartItems(newItems)
    await saveCartItems(newItems)
  }

  const clearCart = async () => {
    setCartItems([])
    await saveCartItems([])
  }

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={onClose}
        />
      )}

      {/* Cart Sidebar */}
      <div
        className={`fixed right-0 top-0 h-full w-96 bg-white dark:bg-gray-900 shadow-xl transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Shopping Cart ({getTotalItems()})
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <XMarkIcon className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {cartItems.length === 0 ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <p className="text-gray-500 dark:text-gray-400">Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={60}
                    height={60}
                    className="rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 dark:text-white">{item.name}</h3>
                    <p className="text-gray-500 dark:text-gray-400">${item.price}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                    >
                      <MinusIcon className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                    >
                      <PlusIcon className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-1 hover:bg-red-100 dark:hover:bg-red-900 rounded"
                    >
                      <TrashIcon className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="border-t border-gray-200 dark:border-gray-700 p-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold text-gray-900 dark:text-white">Total:</span>
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                ${getTotalPrice().toFixed(2)}
              </span>
            </div>
            <div className="space-y-2">
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors">
                Proceed to Checkout
              </button>
              <button
                onClick={clearCart}
                className="w-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium py-2 rounded-lg transition-colors"
              >
                Clear Cart
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  )
} 