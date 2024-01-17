'use client'


import Select from 'react-select';

interface Props {
  label?: string,
  options: any,
  defaultValue?: any,
  onChange?: any
}

const customStyles = {
  control: (provided: any) => ({
    ...provided,
    fontSize: '14px',
    border: 0,
    outline: 'none',
    boxShadow: 'none',
    padding: "0 15px",
    borderRadius: '50px', // Adjust the border-radius as needed
    backgroundColor: '#F4F4F5', // Set your desired background color
  }),

  valueContainer: (provided: any) => ({
    ...provided,
    outline: "none",
    padding: '0px', // Set the desired padding for the value container
  }),

  option: (provided: any, state: any) => ({
    ...provided,
    padding: "10px 15px",
    fontSize: '14px',
    margin: "6px 0",
    backgroundColor: state.isSelected ? '#A3E636' : '#F4F4F5', // Set the background color for selected and non-selected options
    color: state.isSelected ? "#000000" : '#000000', // Set the text color for selected and non-selected options
    borderRadius: '20px', // Adjust the border-radius as needed
    '&:hover': {
      backgroundColor: '#A3E636',
    },
  }),

  menu: (provided: any) => ({
    ...provided,
    padding: '5px', // Set the desired padding for the menu
    borderRadius: '20px',
    backgroundColor: '#FAFAFA',
    boxShadow: 'rgba(17, 17, 26, 0.05) 0px 4px 8px, rgba(17, 17, 26, 0.05) 0px 8px 16px;'
  }),
};

const ReactSelect: React.FC<Props> = ({ label, options, defaultValue, onChange }) => {

  return (
    <div className='my-3'>
      {label && <label className="text-sm ml-3 text-zinc-800">{label}</label>}

      <Select
        placeholder=""
        styles={customStyles}
        isSearchable={true}
        defaultValue={defaultValue}
        options={options}
        onChange={(value) => onChange(value)}
      />
    </div>
  )

}

export default ReactSelect;