
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

  if (newFilters.status && newFilters.status.value) {
    return {
      ...defaultFilters,
      where: { status: { value: newFilters.status.value } },
    }
  }

  return defaultFilters;

}


export const reactSelectCustomStyle = {
  control: (provided: any) => ({
    ...provided,
    fontSize: '14px',
    border: 0,
    outline: 'none',
    boxShadow: 'none',
    padding: "0 15px",
    borderRadius: '50px',
    backgroundColor: '#F4F4F5',
  }),

  valueContainer: (provided: any) => ({
    ...provided,
    outline: "none",
    padding: '0px',
  }),

  option: (provided: any, state: any) => ({
    ...provided,
    padding: "2px 15px",
    fontSize: '14px',
    margin: "3px 0",
    backgroundColor: state.isSelected ? '#EBFCCB' : 'transparent',
    color: state.isSelected ? '#84CC17' : '#27272A',
    borderRadius: '20px',
    '&:hover': {
      color: "#27272A",
      backgroundColor: '#F4F4F5',
    },
  }),

  menu: (provided: any) => ({
    ...provided,
    padding: '5px',
    borderRadius: '20px',
    backgroundColor: '#FAFAFA',
    boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'
  }),
};
