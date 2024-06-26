'use client'

import Select from 'react-select';
import { reactSelectCustomStyle } from '../functions';

interface Props {
  label?: string,
  options: any,
  defaultValue?: any,
  onChange?: any,
  onInputChange?: any,
  placeholder?: any
}

const ReactSelect: React.FC<Props> = ({ label, options, defaultValue, onChange, onInputChange, placeholder = "" }) => {

  return (
    <div className='my-3'>
      {label && <label className="text-sm ml-3 text-zinc-800">{label}</label>}

      <Select
        onInputChange={(value) => onInputChange && onInputChange(value)}
        placeholder={placeholder}
        styles={reactSelectCustomStyle}
        isSearchable={true}
        defaultValue={defaultValue}
        options={options}
        onChange={(value) => onChange(value)}
      />
    </div>
  )

}

export default ReactSelect;