'use server'

import { save } from '@/app/apis'

export const saveActivity = async (formData: any) => {

  const response = formData?.id ? await save(`/activity/${+formData.id}`, "PATCH", formData) : await save('/activity', "POST", formData);
  const data = response.ok && response.status === 201 || response.status === 200 && await response.json();
  return data && { message: response.statusText, status: response.status }

}


export const searchActivities = async (filters: any) => {
  const response = await save('/activity/search', "POST", filters);
  return await response.json();
}