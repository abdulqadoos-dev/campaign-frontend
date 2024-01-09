'use server'

import { post, get } from '@/app/apis'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'


export const save = async (prevState: any, formData: FormData) => {

  const lead = {
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    designation: formData.get('designation'),
    url: formData.get('url'),
    email: formData.get('email'),
    status: formData.get('lastName'),
    notes: formData.get('notes'),
  }

  const response = await post('/leads', lead);
  const data = response.ok && response.status === 201 && await response.json();
  return data && { message: response.statusText , status: response.status }

}


export const getLeads = async () =>  {
  const response = await get('/leads');
  return await response.json();
}