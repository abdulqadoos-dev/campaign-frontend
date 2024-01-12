'use client'

interface Props {
  label?: string;
  name?: string;
  options?: any;
  onChange?: any;
  selected?: string;
}


const Select: React.FC<Props> = ({ name, label, options, selected, onChange }) => {

  return (
    <div className="my-3">
      {label && <label className="text-xs ml-4 mb-4 capitalize text-zinc-800">{label}</label>}
      <select
        name={name}
        onChange={onChange}
        className="w-full bg-zinc-100 rounded-full py-2 px-4 text-sm  focus:outline-none"
      >

        <option value={""}> -- select --</option>
        {options?.length ? options.map(((option: any) => (<option selected={selected === option.value} value={option.value}>{option.label}</option>))) : null}

      </select>
    </div>
  )
}

export default Select