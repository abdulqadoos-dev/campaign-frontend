'use client'

import close from "@icons/close.svg"
import Image from "next/image"
import { useEffect, useState } from "react"


interface Props {
  response: string | undefined;
  setResponse: any;
}

const Alert: React.FC<Props> = ({ response, setResponse }) => {


  const [alert, setAlert] = useState(true)

  useEffect(() => {
    let delay = setTimeout(() => {
      setAlert(false)
      setResponse(null)
    }, 1000)
    return () => clearTimeout(delay)
  }, [])


  return alert ?
    <div className='fixed w-80 h-8 bg-lime-100 text-lime-500 rounded-full top-3 right-10 flex text-sm items-center justify-between pl-3 pr-2'>
      {response}
      <Image
        className=" bg-white p-1 hover:bg-zinc-50 rounded-full cursor-pointer "
        src={close} alt="svg" width={24} height={20}
        onClick={() => {
          setAlert(false)
          setResponse(null)
        }}
      />
    </div>
    : <></>

}

export default Alert