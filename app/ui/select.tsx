'use client'

interface Props {
  label?: string;
  name?: string;
  options?: any;
  onChange?: any;
  selected?: string;
  palceholder?: string | undefined;
  className?: string | undefined
}

const Select: React.FC<Props> = ({ name, label, options, selected, onChange, palceholder, className }) => {

  return (
    <div className="my-3">
      {label && <label className="text-sm ml-3 text-zinc-800">{label}</label>}
      <select
        name={name}
        onChange={onChange}
        className={`w-full border-r-8 border-transparent rounded-full bg-zinc-100 px-4 py-2 text-sm outline-none  ${className}`}
      >

        <option value={""}> {palceholder || "-- select --"}</option>
        {options?.length ? options.map(((option: any, index: number) => (<option key={index} selected={selected === option.value} value={option.value}>{option.label}</option>))) : null}

      </select>
    </div>
  )
}

export default Select