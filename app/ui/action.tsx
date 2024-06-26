'use client'

import Image from 'next/image';

interface Props {
  icon: string;
  className?: string;
  onClick?: any;
  height?: number;
  width?: number;
}

const Action: React.FC<Props> = ({ className, icon, onClick, height, width }) => {
  return <Image
    className={`inline-block font-medium bg-zinc-100 hover:bg-zinc-200 p-1  cursor-pointer rounded-full ${className} `}
    src={icon} alt="svg" width={width || 24} height={height || 20}
    onClick={onClick}
  />
}

export default Action;