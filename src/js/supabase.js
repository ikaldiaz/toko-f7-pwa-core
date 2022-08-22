import { createClient } from '@supabase/supabase-js'

const options = {
  schema: 'public',
  // headers: { 'x-my-custom-header': 'my-app-name' },
  // autoRefreshToken: true,
  // persistSession: true,
  // detectSessionInUrl: true,
}
// console.log(import.meta.env.VITE_SUPABASE_URL);
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_PUBLIC_ANON_KEY

const supabase = createClient(
  supabaseUrl, 
  supabaseAnonKey,
  // options
  )

// const session = supabase.auth.session()

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
  return user
  // console.log(user)
  // console.log(session)
}

const signIn = async (em, pass) => {
  const { user, session, error } = await supabase.auth.signIn({
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


// const { error } = await supabase.auth.signOut()

const signOut = async () => {
  const { error } = await supabase.auth.signOut()
      

  if(!error) {
    console.log('success')
  }else{
    console.log('error');
  }
  return error;
  // console.log(user)
  // console.log(session)
}

async function getTable(tableName, order) {
  console.log('Calling from getTable in supabase.js');
  // const { data, error } = await supabase
  // .from('cities')
  // .select('name, country_id')
  // .order('id', { ascending: false })

  const { data, error } = await supabase
  .from(tableName)
  .select()
  .order(order, { ascending: true })

  if(!error){
    console.log('Success getTable in supabase.js ');
    return data
  }else{
    console.log('Error getTable in supabase.js :'+error);
    return false
  }
}

/*
single()
Retrieves only one row from the result. Result must be one row (e.g. using limit), otherwise this will result in an error.

const { data, error } = await supabase
  .from('cities')
  .select('name, country_id')
  .limit(1)
  .single()

Examples
With select()
const { data, error } = await supabase
  .from('cities')
  .select('name, country_id')
  .limit(1)
  .single()

  */

function isEmailAddress(em) {
  let pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/; 
  return em.match(pattern) ? true : false;    
}

export { supabase, getTable, signIn, signUp, signOut, isEmailAddress }