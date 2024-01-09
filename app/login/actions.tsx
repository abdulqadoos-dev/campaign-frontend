'use server'

import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'


export async function login(formData: FormData) {

  const rawFormData = {
    username: formData.get('username'),
    password: formData.get('password'),
  }

  const response = await fetch('http://localhost:8000/login', {
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


export const logout = async () => cookies().delete('user');