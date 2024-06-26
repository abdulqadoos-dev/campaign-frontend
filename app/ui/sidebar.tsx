'use client'

import Link from 'next/link';
import Image from 'next/image';
import { redirect, usePathname } from 'next/navigation';


import Leads from '@icons/leads.svg';
import Logout from '@icons/logout.svg';
import UsersIcon from "@icons/users.svg";
import Companies from "@icons/company.svg";
import UserImage from '@images/person.jpeg';
import Dashboard from '@icons/dashboard.svg';
import Campaigns from '@icons/campaigns.svg';
import Activity from '@icons/activity.svg';
import Status from '@icons/status.svg';
import Email from '@icons/email.svg';

import Tag from '@ui/tag';
import Heading from '@ui/heading';

import { logout } from '@/app/login/actions';

import { useRouter } from 'next/navigation'


const Sidebar: React.FC<{}> = () => {

  const pathname = usePathname();
  const router = useRouter()

  return (
    <>
      <div className="flex gap-3 p-3 items-center mt-2">
        <Image src={UserImage} alt='user image' className="rounded-full" width={50} height={50} />
        <div>
          <Heading label={"abdul qadoos"} className={"text-sm"} />
          <Tag label={"admin"} />
        </div>
      </div>

      <nav className="flex flex-col  gap-2  border-t border-dashed  border-zinc-200 p-3">
        <Link href="/dashboard" className={`flex gap-2 text-sm items-center py-2 px-3 rounded-full hover:bg-lime-400 ${pathname === '/dashboard' ? 'bg-lime-400' : ''}`}>
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

        <Link href="/companies" className={`flex gap-2 text-sm items-center py-2 px-3 rounded-full  hover:bg-lime-400 ${pathname === '/companies' ? 'bg-lime-400' : ''} `}>
          <Image src={Companies} alt="campaign icon" width={0} height={20} />
          <span> Companies</span>
        </Link>

        <Link href="/emails" className={`flex gap-2 text-sm items-center py-2 px-3 rounded-full  hover:bg-lime-400 ${pathname === '/emails' ? 'bg-lime-400' : ''} `}>
          <Image src={Email} alt="campaign icon" width={0} height={20} />
          <span> Emails</span>
        </Link>
{/* 
        <Link href="/activities" className={`flex gap-2 text-sm items-center py-2 px-3 rounded-full  hover:bg-lime-400 ${pathname === '/activites' ? 'bg-lime-400' : ''} `}>
          <Image src={Activity} alt="campaign icon" width={0} height={20} />
          <span> Activities</span>
        </Link> */}

        <Link href="/statuses" className={`flex gap-2 text-sm items-center py-2 px-3 rounded-full  hover:bg-lime-400 ${pathname === '/statuses' ? 'bg-lime-400' : ''} `}>
          <Image src={Status} alt="campaign icon" width={0} height={20} />
          <span> Statuses</span>
        </Link>

        <Link href="/users" className={`flex gap-2 text-sm items-center py-2 px-3 rounded-full  hover:bg-lime-400 ${pathname === '/users' ? 'bg-lime-400' : ''} `}>
          <Image src={UsersIcon} alt="Users icon" width={0} height={20} />
          <span> Users</span>
        </Link>


        <button
          onClick={async () => {
            const exit = await logout();
            !exit && router.push('/login', { scroll: false })
          }}
          type="submit" className={`flex gap-2 text-sm items-center py-2 px-3 rounded-full  hover:bg-lime-400 ${pathname === '/login' ? 'bg-lime-400' : ''} `}>
          <Image src={Logout} alt="campaign icon" width={0} height={20} />
          <span> Logout</span>
        </button>

      </nav>

    </>
  )
}

export default Sidebar;