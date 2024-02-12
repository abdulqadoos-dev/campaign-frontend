'use server'

import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'


export async function login(formData: FormData) {

  const rawFormData = {
    username: formData.get('username'),
    password: formData.get('password'),
  }

  console.log("login")

  const response = await fetch(`${process.env.SERVER_PATH}/login`, {
    cache: 'no-store',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(rawFormData),
  });

  let data = response.ok && response.status === 200 && await response.json();

  data && cookies().set('user', JSON.stringify(data));

  return data ? redirect('/dashboard') : redirect('/login');

}



export async function loginWithGoogle() {

  console.log("loginWithGoogle:start", `${process.env.SERVER_PATH}/google`)
  const response = await fetch(`${process.env.SERVER_PATH}/google`, {
    cache: 'no-store',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // let data = response.ok && response.status === 200 && await response.json();

  // data && cookies().set('user', JSON.stringify(data));

  console.log(response, "loginWithGoogle")

  // return data ? redirect('/dashboard') : redirect('/login');

}



export const logout = async () => cookies().delete('user');