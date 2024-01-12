'use client'
import Image from "next/image";

interface Props {
  lable: string;
  className?: string;
  icon?: string;
  onClick?: any;
  active?: string;
}

const Button: React.FC<Props> = ({ lable, className, icon, onClick, active }) => {
  return (
    <button
      className={`rounded-full  text-zinc-800 hover:bg-lime-400 capitalize text-sm py-2 px-4  ${active ? "bg-lime-400" : "bg-zinc-100"} ${className}  ${icon ? 'flex gap-1' : ''}`}
      onClick={onClick}
    >
      {icon && <Image src={icon} width={0} height={20} alt="button icon" />}
      {lable}
    </button>
  )
}

export default Button;