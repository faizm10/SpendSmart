'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { onAuthStateChanged, signOut } from '@/lib/firebase/auth'
import { Button } from '@/components/ui/button'

export default function Dashboard() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged((u: any) => {
      setUser(u)
      setLoading(false)
      if (!u) {
        router.replace('/')
      }
    })
    return () => unsubscribe()
  }, [router])

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  if (!user) {
    return null // Redirecting
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Welcome to your Dashboard</h1>
      <p className="mb-8">Signed in as <span className="font-semibold">{user.displayName || user.email}</span></p>
      <Button onClick={signOut}>Sign Out</Button>
    </div>
  )
} 