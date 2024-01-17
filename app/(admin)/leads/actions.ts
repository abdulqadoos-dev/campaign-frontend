'use server'

import { save, get } from '@/app/apis'

// export const saveLead = async (prevState: any, formData: FormData) => {
export const saveLead = async (formData: any) => {

  // const id = formData.get('id');

  // const newFormData = {
  //   firstName: formData.get('firstName'),
  //   lastName: formData.get('lastName'),
  //   designation: formData.get('designation'),
  //   url: formData.get('url'),
  //   email: formData.get('email'),
  //   notes: formData.get('notes'),
  //   address: formData.get('address'),
  //   // statusId: formData.get('statusId'),
  //   status: {id: 1},
  // }

  const response = formData.id ? await save(`/leads/${+formData.id}`, "PATCH", formData) : await save('/leads', "POST", formData);
  const data = response.ok && response.status === 201 || response.status === 200 && await response.json();
  return data && { message: response.statusText, status: response.status }

}


export const getLeads = async () => {
  const response = await get('/leads');
  return await response.json();
}


export const searchLeads = async (filters: any) => {
  const response = await save('/leads/search', "POST", filters);
  return await response.json();
}