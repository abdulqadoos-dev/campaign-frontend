'use server'

import { save } from '@/app/apis'


export const saveCompany = async (formData: any) => {
  const response = formData.id ? await save(`/companies/${+formData.id}`, "PATCH", formData) : await save('/companies', "POST", formData);
  const data = response.ok && response.status === 201 || response.status === 200 && await response.json();
  return data && { message: response.statusText, status: response.status }
}


export const searchCompanies = async (filters: any) => {
  const response = await save('/companies/search', "POST", filters);
  return await response.json();
}