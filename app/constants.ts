export const AUTH_ROUTES = ['/login'];

export const LEADS = "leads";
export const ACTIVITIES = "activities";
export const COMPANIES = "companies";


export const hirringOptions = [
  { label: "remote", value: "remote" },
  { label: "anyware", value: "anyware" },
  { label: "hybraid", value: "hybraid" },
  { label: "on-site", value: "on-site" },
  { label: "in-countroy", value: "in-countroy" },
]


export const statusTypeOptions = [
  { label: LEADS, value: LEADS },
  { label: COMPANIES, value: COMPANIES },
  { label: ACTIVITIES, value: ACTIVITIES },
]


export const tagColours = [
  'bg-lime-100 text-lime-500',
  'bg-red-100 text-red-500',
  'bg-orange-100 text-orange-500',
  'bg-yellow-100 text-yellow-500',
  'bg-green-100 text-green-500',
  'bg-teal-100 text-teal-500',
  'bg-blue-100 text-blue-500',
  'bg-sky-100 text-sky-500',
  'bg-violet-100 text-violet-500',
  'bg-purple-100 text-purple-500',
  'bg-pink-100 text-pink-500',
  'bg-zinc-100 text-zinc-500',
]


export const defaultFilters = { query: "", status: "", skip: 0, take: 20 }