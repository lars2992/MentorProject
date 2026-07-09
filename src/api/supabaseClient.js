import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://nhbjcqycbpxtqiqsphun.supabase.co'
const supabaseAnonKey = 'sb_publishable_m7NMlKnjXEf5JG_jTqBl9g_hisbiWHp'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)