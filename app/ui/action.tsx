'use client'

import Image from 'next/image';

interface Props {
  icon: string;
  className?: string;
  onClick?: any;
}

const Action: React.FC<Props> = ({ className, icon, onClick }) => {
  return <Image
    className={`inline-block font-medium bg-zinc-100 p-1  cursor-pointer rounded-full ${className} `}
    src={icon} alt="svg" width={24} height={20}
    onClick={onClick}
  />
}

export default Action;