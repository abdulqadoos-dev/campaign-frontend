'use server'

import { save } from '@/app/apis'

export const saveActivity = async (prevState: any, formData: FormData) => {

  const id = formData.get('id');

  const newFormData = {
    name: formData.get('name'),
    notes: formData.get('notes'),
    status: formData.get('status'),
  }

  const response = id ? await save(`/activity/${+id}`, "PATCH", newFormData) : await save('/activity', "POST", newFormData);
  const data = response.ok && response.status === 201 || response.status === 200 && await response.json();
  return data && { message: response.statusText, status: response.status }

}


export const searchActivities = async (filters: any) => {
  const response = await save('/activity/search', "POST", filters);
  return await response.json();
}