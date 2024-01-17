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
    border: "none",
    padding: "0 15px",
    borderRadius: '50px', // Adjust the border-radius as needed
    backgroundColor: '#f0f0f0', // Set your desired background color
  }),

  valueContainer: (provided: any) => ({
    ...provided,
    outline: "none",
    padding: '0px', // Set the desired padding for the value container
  }),

  option: (provided: any, state: any) => ({
    ...provided,
    padding: "5px 10px",
    cursour: "pointer",
    fontSize: '14px',
    margin: "3px 0",
    backgroundColor: state.isSelected ? '#A3E636' : 'transparent', // Set the background color for selected and non-selected options
    color: state.isSelected ? "black" : 'black', // Set the text color for selected and non-selected options
    borderRadius: '20px', // Adjust the border-radius as needed
    '&:hover': {
      backgroundColor: '#A3E636',
    },
  }),

  menu: (provided: any) => ({
    ...provided,
    padding: '5px', // Set the desired padding for the menu
    outline: 'none',
    borderRadius: '20px',
    backgroundColor: '#f0f0f0',
  }),
};

const ReactSelect: React.FC<Props> = ({ label, options, defaultValue, onChange }) => {

  return (
    <div className='my-3'>
      {label && <label className="text-sm ml-3 text-zinc-800">{label}</label>}

      <Select
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