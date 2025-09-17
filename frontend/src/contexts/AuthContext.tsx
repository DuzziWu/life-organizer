import React, { createContext, useContext, useEffect, useState } from 'react'
import { User, Session, AuthError } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'
import type { Profile } from '../types/database'

interface AuthContextType {
  user: User | null
  profile: Profile | null
  session: Session | null
  loading: boolean
  isFirstVisit: boolean
  signUp: (email: string, password: string, metadata?: any) => Promise<{ error: AuthError | null }>
  signIn: (email: string, password: string) => Promise<{ error: AuthError | null }>
  signOut: () => Promise<{ error: AuthError | null }>
  resetPassword: (email: string) => Promise<{ error: AuthError | null }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: React.ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const [isFirstVisit, setIsFirstVisit] = useState(false)

  // Load user profile from database
  const loadUserProfile = async (userId: string) => {
    try {
      console.log('📝 Loading profile for user:', userId)
      
      // Add timeout to prevent hanging
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Profile loading timeout')), 5000)
      )
      
      const profilePromise = supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()

      const { data, error } = await Promise.race([profilePromise, timeoutPromise]) as any

      if (error) {
        console.error('Error loading user profile:', error)
        // Create a basic profile if not found
        if (error.code === 'PGRST116') {
          console.log('📝 No profile found, creating basic profile...')
          return {
            id: userId,
            full_name: '',
            username: '',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }
        }
        return null
      }

      console.log('📝 Profile loaded successfully:', data)
      return data
    } catch (error) {
      console.error('Error loading user profile (timeout or other):', error)
      // Return basic profile on timeout
      return {
        id: userId,
        full_name: '',
        username: '',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    }
  }

  // Initialize auth state
  useEffect(() => {
    let mounted = true

    // Get initial session
    const initializeAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        
        if (!mounted) return

        setSession(session)
        setUser(session?.user ?? null)
        
        if (session?.user) {
          // Skip profile loading for now, just set basic profile
          if (mounted) {
            setProfile({
              id: session.user.id,
              full_name: session.user.user_metadata?.full_name || '',
              username: session.user.user_metadata?.username || '',
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            })
          }
        }
        
        if (mounted) {
          setLoading(false)
        }
      } catch (error) {
        console.error('Error initializing auth:', error)
        if (mounted) {
          setLoading(false)
        }
      }
    }

    initializeAuth()

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!mounted) return

      console.log('Auth state changed:', event, session?.user?.email)
      
      setSession(session)
      setUser(session?.user ?? null)

      if (session?.user) {
        console.log('📝 User found, setting basic profile...')
        if (mounted) {
          setProfile({
            id: session.user.id,
            full_name: session.user.user_metadata?.full_name || '',
            username: session.user.user_metadata?.username || '',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          })
          console.log('📝 Basic profile set')
        }
        
        if (mounted) {
          // Check if this is the first visit
          const hasVisitedBefore = localStorage.getItem(`visited_${session.user.id}`)
          console.log('Auth event:', event, 'hasVisitedBefore:', hasVisitedBefore)
          
          if (!hasVisitedBefore && (event === 'SIGNED_UP' || event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED')) {
            setIsFirstVisit(true)
            console.log('Setting isFirstVisit to true')
          } else {
            setIsFirstVisit(false)
            console.log('Setting isFirstVisit to false')
          }
          
          console.log('✅ Setting loading to false (user found)')
          setLoading(false)
        }
      } else {
        if (mounted) {
          console.log('❌ No user, setting states to null/false')
          setProfile(null)
          setIsFirstVisit(false)
          setLoading(false)
        }
      }
    })

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [])

  // Auth methods
  const signUp = async (email: string, password: string, metadata: any = {}) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: metadata.fullName || '',
            username: metadata.username || '',
          }
        }
      })

      return { error }
    } catch (error) {
      console.error('Sign up error:', error)
      return { error: error as AuthError }
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      return { error }
    } catch (error) {
      console.error('Sign in error:', error)
      return { error: error as AuthError }
    }
  }

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      return { error }
    } catch (error) {
      console.error('Sign out error:', error)
      return { error: error as AuthError }
    }
  }

  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      })

      return { error }
    } catch (error) {
      console.error('Reset password error:', error)
      return { error: error as AuthError }
    }
  }

  const value: AuthContextType = {
    user,
    profile,
    session,
    loading,
    isFirstVisit,
    signUp,
    signIn,
    signOut,
    resetPassword,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}