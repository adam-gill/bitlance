'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { UserSignUp,UserLogin } from '@/config/apiconfig'
import { createClient } from '@/utils/supabase/server'
interface LoginData{
    email: string,
    password: string,
    username?:string
}

export async function login(formData: LoginData) {
  // const supabase = createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.email as string,
    password: formData.password as string,
    
  }
  const res = await UserLogin(data)
  console.log("res res",res)

  if(res?.status === 200){
    redirect('/dashboard')
    }
}

export async function signup(formData: LoginData) {
  // const supabase = createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.email as string,
    password: formData.password as string,
    username:formData.username as string,
  }
  const res = await UserSignUp(data)

  // const { error } = await supabase.auth.signUp(data)
   console.log(res)
   if(res?.status === 201){
    redirect('/login')
    }

  // if (error) {
  //   redirect('/error')
  // }

  //revalidatePath('/', 'layout')
  //redirect('/login')
}