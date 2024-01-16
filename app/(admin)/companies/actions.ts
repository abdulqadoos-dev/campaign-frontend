'use server'

import { save } from '@/app/apis'

export const saveCompany = async (prevState: any, formData: FormData) => {

  const leadId = formData.get('id');

  const lead = {
    name: formData.get('name'),
    employees: formData.get('employees'),
    type: formData.get('type'),
    url: formData.get('url'),
    email: formData.get('email'),
    status: formData.get('status'),
    notes: formData.get('notes'),
    address: formData.get('address'),
    hiringFrom: formData.get('hiring_form'),
  }

  const response = leadId ? await save(`/companies/${+leadId}`, "PATCH", lead) : await save('/companies', "POST", lead);
  const data = response.ok && response.status === 201 || response.status === 200 && await response.json();
  return data && { message: response.statusText, status: response.status }

}


export const searchCompanies = async (filters: any) => {
  const response = await save('/companies/search', "POST", filters);
  return await response.json();
}