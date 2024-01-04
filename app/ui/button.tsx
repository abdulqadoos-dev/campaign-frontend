
import Image from "next/image";

interface Props {
  lable: string;
  className?: string;
  icon?: string

}

const Button: React.FC<Props> = ({ lable, className, icon }) => {
  return (
    <button className={`rounded-full bg-zinc-100 text-zinc-800 hover:bg-lime-400 text-xs px-4 py-2 ${className} ${icon ? 'flex gap-1' : ''}`}>
      {icon && <Image src={icon} width={16} height={16} alt="button icon" />}
      {lable}
    </button>
  )
}

export default Button;