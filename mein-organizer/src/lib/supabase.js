import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://cvartznspddkedecltcb.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN2YXJ0em5zcGRka2VkZWNsdGNiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgzMjkyODIsImV4cCI6MjA2MzkwNTI4Mn0.6hslgFMpNPFmrGxythzWmTdmwuaeWxyLYMsJOyeh_iw'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
