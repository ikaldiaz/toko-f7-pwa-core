import { createClient } from '@supabase/supabase-js'
import { appForage, avatarForage } from '../js/localforage';

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



const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  avatarForage.dropInstance().then(function() {
    console.log('Dropped the store of the current instance Avatar');
  });

  if(!error) {
    console.log('success')
  }else{
    console.error(error);
  }
  return Promise.resolve(error)
}

const signInAsync = async (em, pass) => {
  const { user, session, error } = await supabase.auth.signIn({
    email: em,
    password: pass,
  })

  if(!error) {
    console.log('supabase user', user)
    console.log('supabase session from signInAsync', session)

    return Promise.resolve(user)
  }else{
    console.error(error.message);
    return false
  }
}

const signUpAsync = async (em, pass, name) => {
  const { user, session, error } = await supabase.auth.signUp(
    {
    email: em,
    password: pass,
    },
    {
      data: {
        first_name: name
      },
    }
  )

  if(!error) {
    console.log('supabase user', user)
    console.log('supabase session', session)
    return Promise.resolve(user)
  }else{
    console.error(error.message);
    return false
  }
}

async function getProductsAsync() {
  // console.log('Calling from getTable in supabase.js');
  const { data, error, status } = await supabase
  .from('products')
  .select()
  .order('title', { ascending: true })

  if (data) {
    // console.log('data not null');
    appForage.setItem('products', data).then(function(value) {
        // console.log(value);
    }).catch(function(err) {
        console.error(err);
    });
  } else {
    // console.log('no data');
  }


  if(!error){
    // console.log('Status -> '+status);
    // console.log('Success getTable in supabase.js ');
    return data
  }else{
    // console.error('Error getTable in supabase.js :'+error.message);
    console.error('Status -> '+status);
    return appForage.getItem('products') ? appForage.getItem('products') : false
  }
}

// async function signIn(em, pass) {
//   try {
//     const { user, session, error } = await supabase.auth.signIn({
//       email: em,
//       password: pass,
//     })

//     if(!error) {
//       console.log('supabase user', user);
//       console.log('supabase session', session);
//       return Promise.resolve(user);
//     }else{
//       throw error;
//     }
//   } catch (error) {
//     console.log('catch', error);
//     return false
//   }
// }

// async function signUp(em, pass) {
//   try {
//     const { user, session, error } = await supabase.auth.signUp({
//       email: em,
//       password: pass,
//     })

//     if(!error) {
//       console.log('supabase user', user);
//       console.log('supabase session', session);
//       return Promise.resolve(user);
//     }else{
//       throw error;
//     }
//   } catch (error) {
//     console.log('catch', error);
//     return false
//   }
// }

async function getProfile() {
  try {
    const user = supabase.auth.user();
    let { data, error, status } = await supabase
      .from('profiles')
      .select(`firstname`)
      .eq('id', user.id)
      .single();

    if (error && status !== 406) {
      throw error;
    }

    if (data) {
      return data
    }
  } catch (error) {
    console.error(error.message);
    return false
  }
}

async function updateProfile() {
  try {
    const user = supabase.auth.user();
    const updates = {
      id: user.id,
      username,
      updated_at: new Date(),
    };

    let { error } = await supabase.from('profiles').upsert(updates);
    if (error) {
      throw error;
    }else{
      return false
    }

  } catch (error) {
    console.error(error.message);
    return false
  }
}

const getPublicProfiles = async () => {

    const user = supabase.auth.user()
    const { data, error, status } = await supabase
      .from("profiles")
      .select("id, firstname, username, avatar_url, website, updated_at")
      .eq('id', user.id)
      .order("updated_at", { ascending: false })
      .single();

      console.log(status);

    if(data){
      avatarForage.setItem('profile', data).then(function(value) {
        console.log(value);
      }).catch(function(err) {
          console.error(err);
      });
    }
    console.log("Public profiles:", data)
    console.log("Offline Public profiles:", appForage.getItem('profile'))
    return data ? data : appForage.getItem('profile')
}


const getPublicProfilesX = async () => {
  
  try {
    
    
    const user = supabase.auth.user()
    const { data, error, status } = await supabase
      .from("profiles")
      .select("id, firstname, username, avatar_url, website, updated_at")
      .eq('id', user.id)
      .order("updated_at", { ascending: false })
      .single();

      console.log(status);

    if (error || !data) {
      throw error || new Error("No data");
    }

    if(data){
      appForage.setItem('profile', data).then(function(value) {
        // console.log(value);
      }).catch(function(err) {
          console.error(err);
      });
    }
    console.log("Public profiles:", data)
    return data
    // setProfiles(data);
  } catch (error) {
    if (error instanceof Error) {
      console.log("error getPublicProfiles", error.message);
    }else{
      console.error(error.message);
    }
  }
}

function isEmailAddress(em) {
  let pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/; 
  return em.match(pattern) ? true : false;    
}

export { supabase, signInAsync, signUpAsync, signOut, isEmailAddress, getProductsAsync, getProfile, getPublicProfiles }