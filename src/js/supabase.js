// // Import the functions you need from the SDKs you need
// import { initializeApp } from 'firebase/app';
// import { getAuth } from 'firebase/auth';
// import { getDatabase } from 'firebase/database';
// import { getStorage } from "firebase/storage";

// /* - - - - - - - - - - - - - - - - - 
//    Configurations for the Firebase
// - - - - - - - - - - - - - - - - - - -  */
// // Firebase Configuration
// const firebaseConfig = {
//     apiKey: import.meta.env.VITE_FIREBASE_apiKey,
//     authDomain: import.meta.env.VITE_FIREBASE_authDomain,
//     databaseURL: import.meta.env.VITE_FIREBASE_databaseURL,
//     projectId: import.meta.env.VITE_FIREBASE_projectId,
//     storageBucket: import.meta.env.VITE_FIREBASE_storageBucket,
//     messagingSenderId: import.meta.env.VITE_FIREBASE_messagingSenderId,
//     appId: import.meta.env.VITE_FIREBASE_appId
// };

// // // Initialize Firebase
// const firebaseApp = initializeApp(firebaseConfig); 

// // //AUTH
// const auth = getAuth(firebaseApp);
// // //DATABASE  
// const db = getDatabase(firebaseApp);
// // // Initialize Cloud Storage and get a reference to the service
// const storage = getStorage(firebaseApp);

// export { firebaseConfig, firebaseApp, auth, db, storage }

import { createClient } from '@supabase/supabase-js'

console.log(import.meta.env.VITE_SUPABASE_URL);
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_PUBLIC_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
export const session = supabase.auth.session()