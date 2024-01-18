'use client'

import Select from 'react-select';

interface Props {
  label?: string,
  options: any,
  defaultValue?: any,
  onChange?: any,
  onInputChange?: any,
  placeholder?: any
}

const customStyles = {
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

const ReactSelect: React.FC<Props> = ({ label, options, defaultValue, onChange, onInputChange, placeholder = "" }) => {

  return (
    <div className='my-3'>
      {label && <label className="text-sm ml-3 text-zinc-800">{label}</label>}

      <Select
        onInputChange={(value) => onInputChange && onInputChange(value)}
        placeholder={placeholder}
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