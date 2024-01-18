'use client'



interface Props {
  className?: string;
}

const Separator: React.FC<Props> = ({ className }) => {

  return <div className={`border-b border-zinc-200 border-dashed ${className}`}></div>

}

export default Separator;