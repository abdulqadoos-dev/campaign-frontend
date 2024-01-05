'use client'

import Image from 'next/image';
import Link from 'next/link';

import Heading from "../ui/heading";
import Button from "../ui/button";
import Tag from '../ui/tag';

import RightIcon from "../public/icons/right.svg";
import EditIcon from "../public/icons/edit.svg"
import Edit from "../ui/edit";

import UserImage from '../public/images/person.jpeg';


const Leads: React.FC<{}> = () => {

  return (
    <>


      {/* <section className="header">
        <div className="flex justify-between items-center">
          <div className="heading">
            <Heading label="leads Statistics" className="text-lg" />
            <span className="text-xs text-zinc-400">Over 500 leads</span>
          </div>
          <Button lable="New Lead" icon={AddIcon} />
        </div>
      </section> */}

      <section className="filters">

      </section>



      <div className="grid grid-cols-7 gap-4 items-center bg-zinc-50 pl-1 pr-5 rounded-large">

        <div className="cursor-pointer col-span-2">
          <div className="flex gap-3 p-3 items-center">
            <Image src={UserImage} alt='user image' className="rounded-full" width={50} height={50} />
            <div>
              <Heading label={"louis candly"} className={"text-sm"} />
              <span className="text-xs text-zinc-400">Marketing manager</span>
            </div>
          </div>
        </div>


        <div className="flex flex-col gap-1 col-span-2  overflow-clip">
          <Heading label={"Intertico"} className={"text-sm font-normal"} />
          <Link href={"/"} className="text-xs text-zinc-400">{('https://www.linkedin.com/company/inzonedubai/').substr(0, 40)}..</Link>
        </div>


        <div className="flex justify-center ">
          <Tag label={'in chat'} className="w-fit" />
        </div>


        <div className="flex justify-end items-center gap-3 col-span-2 ">
          <Button lable="visit" icon={RightIcon} />
          <Button lable="Edit" icon={EditIcon} />
        </div>


      </div>




    </>
  )

}

export default Leads;