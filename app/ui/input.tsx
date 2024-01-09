'use client'

interface Props {
  label?: string;
  type: string;
  value?: string | number;
  placeholder?: string;
  onChange?: any;
}

const Input: React.FC<Props> = ({ type, placeholder, label, value, onChange }) => {
  return (
    <div className="my-3">
      {label && <label className="text-xs ml-4 mb-4 capitalize text-zinc-800">{label}</label>}
      <input
        type={type}
        onChange={onChange}
        className="w-full bg-zinc-100 rounded-full py-2 px-4 text-sm placeholder:text-zinc-400 placeholder:text-xs focus:outline-none"
        placeholder={placeholder}
        value={value}
      />
    </div>
  )
}

export default Input