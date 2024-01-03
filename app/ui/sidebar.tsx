import Link from 'next/link';
import Image from 'next/image';


import Heading from './heading';

import UserImage from '../public/images/person.jpeg';
import Dashboard from '../public/icons/dashboard.svg';
import Campaigns from '../public/icons/campaigns.svg';
import Logout from '../public/icons/logout.svg';

const Sidebar = () => {
  return (
    <aside className=" bg-white rounded-large w-full h-[95%] ">

      <div className="flex gap-3 p-3 items-center mt-2">
        <Image src={UserImage} alt='user image' className="rounded-full" width={50} height={50} />
        <div>
          <Heading label={"abdul qadoos"} className={"text-sm"} />
          <span className="text-xs bg-lime-200 p-1 px-3 rounded-full">admin</span>
        </div>
      </div>

      <nav className="flex-1 border-t-2 border-zinc-100 p-3">
        <Link href="/dashboard" className="flex gap-2 text-sm items-center p-3 rounded-full hover:bg-lime-400">
          <Image src={Dashboard} alt="Dashboard icon" width={0} height={20} />
          <span> Dashboard </span>
        </Link>

        <Link href="/campaigns" className="flex gap-2 text-sm items-center p-3 rounded-full  hover:bg-lime-400">
          <Image src={Campaigns} alt="campaign icon" width={0} height={20} />
          <span> Campaigns</span>
        </Link>


        <Link href="/login" className="flex gap-2 text-sm items-center p-3 rounded-full  hover:bg-lime-400">
          <Image src={Logout} alt="campaign icon" width={0} height={20} />
          <span> Logout</span>
        </Link>
      </nav>

    </aside>
  )
}

export default Sidebar;