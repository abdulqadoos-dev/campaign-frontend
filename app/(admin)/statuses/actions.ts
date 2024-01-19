'use server'

import { save } from '@/app/apis'

export const saveStatus = async (formData: any) => {
  const response = formData.id ? await save(`/statuses/${+formData.id}`, "PATCH", formData) : await save('/statuses', "POST", formData);
  const data = response.ok && response.status === 201 || response.status === 200 && await response.json();
  return data && { message: response.statusText, status: response.status }

}


export const searchStatuses = async (filters: any) => {
  const response = await save('/statuses/search', "POST", filters);
  return await response.json();
}


export const getStatusesByType = async (type: string) => {
  const response = await save('/statuses/type', "POST", {type});
  return await response.json();
}