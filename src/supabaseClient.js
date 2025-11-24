import { createClient } from '@supabase/supabase-js'

// Replace with your actual Supabase project credentials
const supabaseUrl = 'https://avusrxumqlmdubdxykrj.supabase.co';

const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF2dXNyeHVtcWxtZHViZHh5a3JqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM2Nzk4MzUsImV4cCI6MjA3OTI1NTgzNX0.1OdQ0fuyH2fLUAAJBF6HLajIUPd1GHGPDWIsWuk1GIY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
