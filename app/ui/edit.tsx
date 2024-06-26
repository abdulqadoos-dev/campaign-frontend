'use client'

import Image from 'next/image';
import EditIcon from '@icons/edit.svg';

interface Props {
  className?: string,
}

const Edit: React.FC<Props> = ({ className }) => {
  return <Image className={` inline-block font-medium bg-zinc-100 p-1 cursor-pointer rounded-full ${className} `} src={EditIcon} alt="edit icon" width={24} height={20} />
}

export default Edit;