'use server'

import { save, get } from '@/app/apis'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'


export const saveLead = async (prevState: any, formData: FormData) => {

  const leadId =  formData.get('id');
  console.log(formData.get('status'));
  
  const lead = {
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    designation: formData.get('designation'),
    url: formData.get('url'),
    email: formData.get('email'),
    status: formData.get('status'),
    notes: formData.get('notes'),
  }

  const response = leadId ? await save(`/leads/${+leadId}`, "PATCH", lead) :  await save('/leads', "POST", lead);
  const data = response.ok && response.status === 201 || response.status === 200 && await response.json();
  return data && { message: response.statusText , status: response.status }

}


export const getLeads = async () =>  {
  const response = await get('/leads');
  return await response.json();
}