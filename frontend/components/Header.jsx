'use client'
import React, { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Wallet } from "lucide-react"
import { onAuthStateChanged, signInWithGoogle, signOut } from "@/lib/firebase/auth"

function Header() {
  const [user, setUser] = useState(null)
  const router = useRouter()
  const initialLoad = useRef(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged((u) => {
      // If user just signed in, redirect to dashboard
      if (!initialLoad.current && u) {
        router.push('/dashboard')
      }
      setUser(u)
      initialLoad.current = false
    })
    return () => unsubscribe()
  }, [router])

  return (
    <nav className="w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Wallet className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">SpendSmart</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium hover:text-primary transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="text-sm font-medium hover:text-primary transition-colors">
              How it Works
            </a>
            <a href="#testimonials" className="text-sm font-medium hover:text-primary transition-colors">
              Reviews
            </a>
            <a href="#faq" className="text-sm font-medium hover:text-primary transition-colors">
              FAQ
            </a>
          </div>
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <div className="flex items-center gap-2">
                  <Avatar>
                    {user.photoURL ? (
                      <img src={user.photoURL} alt={user.displayName || user.email} className="rounded-full w-8 h-8" />
                    ) : (
                      <AvatarFallback>{user.displayName ? user.displayName[0] : user.email[0]}</AvatarFallback>
                    )}
                  </Avatar>
                  <span className="text-sm font-medium">{user.displayName || user.email}</span>
                </div>
                <Button variant="ghost" size="sm" onClick={signOut}>
                  Sign Out
                </Button>
              </>
            ) : (
              <Button size="sm" onClick={signInWithGoogle}>
                Sign In with Google
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export { Header }