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