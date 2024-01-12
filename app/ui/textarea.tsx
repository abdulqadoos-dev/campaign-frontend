'use client'

interface Props {
  label?: string;
  name?: string;
  value?: string | number;
  placeholder?: string;
  onChange?: any;
}

const Textarea: React.FC<Props> = ({ placeholder, name, label, value, onChange }) => {
  return (
    <div className="my-3">
      {label && <label className="text-xs ml-4 mb-4 capitalize text-zinc-800">{label}</label>}
      <textarea
      rows={5}
        name={name}
        onChange={onChange}
        className="w-full bg-zinc-100 rounded-large py-2 px-4 text-sm placeholder:text-zinc-400 placeholder:text-xs focus:outline-none"
        placeholder={placeholder}
      >{value}</textarea>
    </div>
  )
}

export default Textarea