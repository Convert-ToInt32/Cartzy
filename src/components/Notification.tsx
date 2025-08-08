"use client"

import { useState, useEffect } from "react"
import { BellIcon, XMarkIcon } from "@heroicons/react/24/outline"

interface Notification {
  id: string
  title: string
  message: string
  type: "info" | "success" | "warning" | "error"
  timestamp: Date
  read: boolean
}

interface NotificationProps {
  userId?: string
}

export function Notification({ userId }: NotificationProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)

  useEffect(() => {
    const loadNotifications = async () => {
      if (userId) {
        // Load from database for logged-in users
        try {
          const response = await fetch('/api/notifications')
          if (response.ok) {
            const data = await response.json()
            setNotifications(data)
            setUnreadCount(data.filter((n: Notification) => !n.read).length)
          }
        } catch (error) {
          console.error('Error loading notifications:', error)
        }
      } else {
        // Load from localStorage for non-logged-in users
        const savedNotifications = localStorage.getItem('cartzy-notifications')
        if (savedNotifications) {
          const data = JSON.parse(savedNotifications)
          setNotifications(data)
          setUnreadCount(data.filter((n: Notification) => !n.read).length)
        }
      }
    }
    
    loadNotifications()
  }, [userId])

  const markAsRead = async (notificationId: string) => {
    const updatedNotifications = notifications.map(n =>
      n.id === notificationId ? { ...n, read: true } : n
    )
    setNotifications(updatedNotifications)
    setUnreadCount(updatedNotifications.filter(n => !n.read).length)

    if (userId) {
      // Update in database
      try {
        await fetch(`/api/notifications/${notificationId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ read: true })
        })
      } catch (error) {
        console.error('Error updating notification:', error)
      }
    } else {
      // Update in localStorage
      localStorage.setItem('cartzy-notifications', JSON.stringify(updatedNotifications))
    }
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return '✅'
      case 'warning':
        return '⚠️'
      case 'error':
        return '❌'
      default:
        return 'ℹ️'
    }
  }

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
      case 'warning':
        return 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800'
      case 'error':
        return 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
      default:
        return 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800'
    }
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
      >
        <BellIcon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Notification Dropdown */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Notifications
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
              >
                <XMarkIcon className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-6 text-center text-gray-500 dark:text-gray-400">
                No notifications
              </div>
            ) : (
              <div className="p-4 space-y-3">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-3 rounded-lg border ${getNotificationColor(notification.type)} ${
                      !notification.read ? 'ring-2 ring-blue-500/20' : ''
                    }`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="flex items-start space-x-3">
                      <span className="text-lg">{getNotificationIcon(notification.type)}</span>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          {notification.title}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {notification.message}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                          {new Date(notification.timestamp).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
} 