'use client'

import Select from 'react-select';
import { reactSelectCustomStyle } from '../functions';

interface Props {
  label?: string,
  options: any,
  defaultValues?: any,
  onChange?: any,
  onInputChange?: any,
  placeholder?: any
}


const ReactMultiSelect: React.FC<Props> = ({ label, options, defaultValues, onChange, onInputChange, placeholder = "" }) => {

  return (
    <div className='my-3'>
      {label && <label className="text-sm ml-3 text-zinc-800">{label}</label>}
      <Select
        defaultValue={defaultValues}
        isMulti
        styles={reactSelectCustomStyle}
        isSearchable={true}
        options={options}
        onChange={(value) => onChange(value)}
        onInputChange={(value) => onInputChange && onInputChange(value)}
      />
    </div>
  )

}

export default ReactMultiSelect;