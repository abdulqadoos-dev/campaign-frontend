
interface Props {
  lable: string;
  className: string;

}

const Button: React.FC<Props> = ({ lable, className }) => {
  return (
    <button className={`rounded-full bg-zinc-100 text-zinc-800 hover:bg-lime-500 hover:text-white ${className}`}>{lable}</button>
  )
}

export default Button;