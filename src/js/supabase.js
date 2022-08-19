import { createClient } from '@supabase/supabase-js'

// console.log(import.meta.env.VITE_SUPABASE_URL);
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_PUBLIC_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseAnonKey)
const session = supabase.auth.session()

const signUp = async (em, pass) => {
  const { user, session, error } = await supabase.auth.signUp({
      email: em,
      password: pass,
  })
      

  if(!error) {
    console.log('success')
  }else{
    console.log('error');
  }
  return user;
  // console.log(user)
  // console.log(session)
}

export { supabase, session, signUp }