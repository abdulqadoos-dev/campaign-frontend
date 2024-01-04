'use client'

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation'

import Heading from './heading';
import UserImage from '../public/images/person.jpeg';
import Dashboard from '../public/icons/dashboard.svg';
import Campaigns from '../public/icons/campaigns.svg';
import Leads from '../public/icons/leads.svg';
import Logout from '../public/icons/logout.svg';
import Tag from './tag';


const Sidebar: React.FC<{}> = () => {

  const pathname = usePathname()
  return (
    <aside className="bg-white rounded-large w-full h-[95%] ">

      <div className="flex gap-3 p-3 items-center mt-2">
        <Image src={UserImage} alt='user image' className="rounded-full" width={50} height={50} />
        <div>
          <Heading label={"abdul qadoos"} className={"text-sm"} />
          <Tag label={"admin"} />
        </div>
      </div>

      <nav className="flex flex-col  gap-2  border-t border-dashed  border-zinc-200 p-3">
        <Link href="/dashboard" className={`flex gap-2 text-sm items-center py-2  px-3 rounded-full hover:bg-lime-400 ${pathname === '/dashboard' ? 'bg-lime-400' : ''}`}>
          <Image src={Dashboard} alt="Dashboard icon" width={0} height={20} />
          <span> Dashboard </span>
        </Link>

        <Link href="/campaigns" className={`flex gap-2 text-sm items-center py-2 px-3 rounded-full  hover:bg-lime-400 ${pathname === '/campaigns' ? 'bg-lime-400' : ''} `}>
          <Image src={Campaigns} alt="campaign icon" width={0} height={20} />
          <span> Campaigns</span>
        </Link>

        <Link href="/leads" className={`flex gap-2 text-sm items-center py-2 px-3 rounded-full  hover:bg-lime-400 ${pathname === '/leads' ? 'bg-lime-400' : ''} `}>
          <Image src={Leads} alt="lead icon" width={0} height={20} />
          <span> Leads</span>
        </Link>


        <Link href="/login" className={`flex gap-2 text-sm items-center py-2 px-3 rounded-full  hover:bg-lime-400 ${pathname === '/login' ? 'bg-lime-400' : ''} `}>
          <Image src={Logout} alt="campaign icon" width={0} height={20} />
          <span> Logout</span>
        </Link>
      </nav>

    </aside>
  )
}

export default Sidebar;