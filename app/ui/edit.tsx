'use client'

import Image from 'next/image';
import EditIcon from '../public/icons/edit.svg';

interface Props {
  className?: string,
}

const Edit: React.FC<Props> = ({ className }) => {
  return <Image className={` inline-block font-medium bg-zinc-100 p-1 rounded-full ${className} `} src={EditIcon} alt="edit icon" width={22} height={22} />

}

export default Edit;