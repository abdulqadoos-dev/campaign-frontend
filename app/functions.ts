
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
      statuses: newFilters.status,
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
      where: { statuses: { value: newFilters.status.value } },
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


export const convertToCompanyData = (htmlContent: any, setCompanyForm: any, companyForm: any) => {

  let parser = new DOMParser();
  let doc = parser.parseFromString(htmlContent, 'text/html');

  // Extracting information
  let nameElement: any = doc.querySelector('.org-top-card-summary__title');
  let name = nameElement ? nameElement.textContent.trim() : '';

  let taglineElement: any = doc.querySelector('.org-top-card-summary__tagline');
  let tagline = taglineElement ? taglineElement.textContent.trim() : '';

  let typeElement: any = doc.querySelector('.org-top-card-summary-info-list__info-item');
  let type = typeElement ? typeElement.textContent.trim() : '';

  let locationElement: any = doc.querySelector('.org-top-card-summary-info-list .inline-block .org-top-card-summary-info-list__info-item');
  let address = locationElement ? locationElement.textContent.trim() : '';

  let followersElement: any = doc.querySelector('.org-top-card-summary-info-list__info-item:nth-child(2)');
  let followers = followersElement ? followersElement.textContent.trim() : '';

  let employeesElement: any = doc.querySelector('.org-top-card-summary-info-list__info-item:nth-child(3)');
  let employees = employeesElement ? employeesElement.textContent.trim() : '';

  let logoElement: any = doc.querySelector('.org-top-card-primary-content__logo-container');
  let imageUrl = logoElement ? logoElement?.querySelector('img')?.getAttribute('src') : '';

  // Displaying the extracted information

  setCompanyForm({ ...companyForm, name, address, imageUrl, type, employees: `${followers} ${employees}` })

}
