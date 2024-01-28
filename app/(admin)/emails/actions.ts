'use server'

import { save, get } from '@/app/apis'


export const saveEmail = async (formData: any) => {
  const response = formData.id ? await save(`/emails/${+formData.id}`, "PATCH", formData) : await save('/emails', "POST", formData);
  const data = response.ok && response.status === 201 || response.status === 200 && await response.json();
  return data && { message: response.statusText, status: response.status }
}


export const searchEmails = async (filters: any) => {
  const response = await save('/emails/search', "POST", filters);
  return await response.json();
}

export const getEmailTemplates = async () => {
  const response = await get('/emails');
  return await response.json();
}

