import { auth } from "@/lib/auth"
import { redirect } from 'next/navigation'
import UserProfile from '@/components/UserProfile'

export default async function Home() {
  const session = await auth()

  if (!session) {
    redirect('/auth/signin')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">Kimia Farma</h1>
            </div>
            <div className="flex items-center">
              <UserProfile user={session.user} />
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg">
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Welcome to Kimia Farma
              </h2>
              <p className="text-gray-600 mb-8">
                You are successfully logged in as {session.user?.name}
              </p>
              
              <div className="bg-white max-w-md mx-auto rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4">System Status</h3>
                <div className="space-y-2 text-left">
                  <div className="flex items-center">
                    <span className="w-3 h-3 bg-green-400 rounded-full mr-2"></span>
                    <span className="text-sm">✅ NextAuth Authentication</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-3 h-3 bg-green-400 rounded-full mr-2"></span>
                    <span className="text-sm">✅ SQLite Database</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-3 h-3 bg-green-400 rounded-full mr-2"></span>
                    <span className="text-sm">✅ Dummy Users Loaded</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-3 h-3 bg-red-400 rounded-full mr-2"></span>
                    <span className="text-sm">❌ No Clerk (Removed)</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-3 h-3 bg-red-400 rounded-full mr-2"></span>
                    <span className="text-sm">❌ No Neon DB (Removed)</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-3 h-3 bg-red-400 rounded-full mr-2"></span>
                    <span className="text-sm">❌ No Stripe (Removed)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
