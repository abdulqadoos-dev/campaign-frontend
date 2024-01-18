'use server'

import { save } from '@/app/apis'


export const saveLead = async (formData: any) => {
  const response = formData.id ? await save(`/leads/${+formData.id}`, "PATCH", formData) : await save('/leads', "POST", formData);
  const data = response.ok && response.status === 201 || response.status === 200 && await response.json();
  return data && { message: response.statusText, status: response.status }
}


export const searchLeads = async (filters: any) => {
  const response = await save('/leads/search', "POST", filters);
  return await response.json();
}