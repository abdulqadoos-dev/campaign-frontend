'use client'

interface Props {
  label : string,
  className? : string,
}


const Tag: React.FC<Props> = ({label, className}) => {
  return <span className={`text-xs font-medium  p-1 px-3 min-w-20 text-center inline-block  rounded-full ${className || 'bg-lime-100 text-lime-500' } `}>{label}</span>
}

export default Tag;