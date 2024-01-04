'use client'

interface Props {
  label : string,
  className? : string,
}

const Tag: React.FC<Props> = ({label, className}) => {
  return <span className={`text-xs font-medium bg-lime-100 inline-block text-lime-500 p-1 px-3 rounded-full ${className} `}>{label}</span>
}

export default Tag;