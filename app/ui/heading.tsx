'use client'
interface Props {
  label: string;
  className?: string;
}

const Heading: React.FC<Props> = ({ label, className }) => {
  return <h2 className={` font-bold text-zinc-800 capitalize ${className}`}>{label}</h2>
}

export default Heading;