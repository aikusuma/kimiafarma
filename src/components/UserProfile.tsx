'use client'

import { signOut } from 'next-auth/react'

interface UserProfileProps {
  user: {
    name?: string | null
    email?: string | null
  }
}

export default function UserProfile({ user }: UserProfileProps) {
  return (
    <div className="flex items-center space-x-4">
      <span className="text-sm text-gray-700">
        Hello, {user.name}
      </span>
      <button
        onClick={() => signOut({ callbackUrl: '/auth/signin' })}
        className="bg-red-600 hover:bg-red-700 text-white text-sm px-3 py-1 rounded"
      >
        Sign Out
      </button>
    </div>
  )
}