'use client'

interface Props {
  label?: string;
  type: string;
  name?: string;
  value?: string | number;
  placeholder?: string;
  onChange?: any;
  className?: string;
}

const Input: React.FC<Props> = ({ type, placeholder, name, label, value, onChange, className }) => {
  return (
    <div className={`my-3 ${className}`}>
      {label && <div className="text-sm ml-3 lowercase text-zinc-800">{label}</div>}
      <input
        type={type}
        name={name}
        onChange={onChange}
        className={`w-full bg-zinc-100 rounded-full py-2 px-4 text-sm placeholder:text-zinc-400 placeholder:text-sm border-none focus:outline-none `}
        placeholder={placeholder}
        value={value}
      />
    </div>
  )
}

export default Input