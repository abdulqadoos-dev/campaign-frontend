export const AUTH_ROUTES = ['/login'];

export const LEADS = "leads";
export const ACTIVITIES = "activities";
export const COMPANIES = "companies";

export const JSON_PARSE = "parse";
export const JSON_STRINGIFY = "stringify";



export const statusOptions = [
  { label: "acitve", value: "active" },
  { label: "confirmed", value: "confirmed" },
  { label: "requested", value: "requested" }
]


export const statusTypeOptions = [
  { label: "leads", value: LEADS },
  { label: "companies", value: COMPANIES },
  { label: ACTIVITIES, value: ACTIVITIES },
]


export const defaultFilters = { query: "", status: "", skip: 0, take: 20 }