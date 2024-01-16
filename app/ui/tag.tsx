'use client'

interface Props {
  label : string,
  className? : string,
}


const Tag: React.FC<Props> = ({label, className}) => {
  return <span className={`text-xs font-medium  p-1 px-3 rounded-full ${className || 'bg-lime-100 inline-block text-lime-500' } `}>{label}</span>
}

export default Tag;