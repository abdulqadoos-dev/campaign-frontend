export const AUTH_ROUTES = ['/login'];

export const LEADS = "leads";
export const ACTIVITIES = "activities";
export const COMPANIES = "companies";

export const JSON_PARSE = "parse";
export const JSON_STRINGIFY = "stringify";



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


export const defaultFilters = { query: "", status: "", skip: 0, take: 20 }