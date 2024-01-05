interface Props {
  label: string;
  className?: string;
}

const SubHeading: React.FC<Props> = ({ label, className }) => {
  return <h5 className={` text-xs text-zinc-400 ${className}`}>{label}</h5>
}

export default SubHeading;