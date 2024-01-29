'use client'

interface Props {
  rows?: number;
  label?: string;
  name?: string;
  value?: string | number;
  placeholder?: string;
  onChange?: any;
}

const Textarea: React.FC<Props> = ({ placeholder, name, label, value, onChange, rows }) => {
  return (
    <div className="my-3">
      {label && <label className="text-sm ml-3 text-zinc-800">{label}</label>}
      <textarea
        rows={rows || 5}
        name={name}
        onChange={onChange}
        className="w-full bg-zinc-100 border-none rounded-2xl py-2 px-4 text-sm placeholder:text-zinc-400 placeholder:text-sm focus:outline-none"
        placeholder={placeholder}
        defaultValue={value}
      ></textarea>
    </div>
  )
}

export default Textarea