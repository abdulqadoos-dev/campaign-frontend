'use server'

import { save } from '@/app/apis'

export const saveStatus = async (prevState: any, formData: FormData) => {

  const id = formData.get('id');

  const newFormData = {
    label: formData.get('label'),
    value: formData.get('value'),
    style: formData.get('style'),
    type: formData.get('type'),
  }

  const response = id ? await save(`/statuses/${+id}`, "PATCH", newFormData) : await save('/statuses', "POST", newFormData);
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