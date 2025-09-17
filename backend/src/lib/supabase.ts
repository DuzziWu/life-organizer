import { createClient } from '@supabase/supabase-js'
import type { Database } from '../types/database'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

const supabaseUrl = process.env.SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing Supabase environment variables')
}

// Create Supabase client with service role key for backend operations
export const supabase = createClient<Database>(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

// Test connection function
export async function testSupabaseConnection() {
  try {
    // Test basic connection with a simple query
    const { data, error } = await supabase
      .from('profiles')
      .select('count')
      .limit(1)

    if (error && error.code === 'PGRST116') { 
      // PGRST116 = table not found - need to run migrations
      console.log('⚠️  Database schema not found. Please run migrations first.')
      return false
    } else if (error) {
      console.error('❌ Supabase connection failed:', error.message)
      return false
    }

    console.log('✅ Supabase connection successful!')
    console.log('✅ Database schema is ready')
    return true
  } catch (err) {
    console.error('❌ Supabase connection error:', err)
    return false
  }
}

// Function to check if database schema exists
export async function checkDatabaseSchema() {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('count')
      .limit(1)

    return !error || error.code !== 'PGRST116'
  } catch {
    return false
  }
}

export default supabase