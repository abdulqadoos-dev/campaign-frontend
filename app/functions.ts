import { JSON_PARSE, JSON_STRINGIFY } from "./constants"

export const convertFiltersToQuery = (newFilters: any) => {

  const defaultFilters = {
    order: {
      id: "DESC"
    },
    skip: newFilters.skip,
    take: newFilters.take
  }

  if (newFilters.query && newFilters.status) {
    return {
      ...defaultFilters,
      query: newFilters.query,
      status: newFilters.status,
    }
  }

  if (newFilters.query) {
    return {
      ...defaultFilters,
      query: newFilters.query,
    }
  }

  if (newFilters.status) {
    return {
      ...defaultFilters,
      where: { status: newFilters.status },
    }
  }

  return defaultFilters;

}

export const convertJSON = (data: any, conversion: any) => {

  switch (conversion) {
    case JSON_PARSE:
      return JSON.parse(data);
    case JSON_STRINGIFY:
      return JSON.stringify(data);
    default:
      return []
  }

}