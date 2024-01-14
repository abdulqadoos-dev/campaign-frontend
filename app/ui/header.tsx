'use client'
import Heading from "@ui/heading";
import Breadcrumbs from "@ui/breadcrumbs";
import { usePathname } from 'next/navigation';

import leadsIcon from '@icons/leads.svg';
import usersIcon from '@icons/users.svg';
import dashbaordIcon from '@icons/dashboard.svg';
import campaignsIcon from '@icons/campaigns.svg';



interface Props {
  children?: React.ReactNode;
}

const Header: React.FC<Props> = ({ children }) => {


  const { heading, icon } = breadcrumbs( usePathname().replace("/", ""));

  return (
    <header className="flex justify-between items-center">
      <div className="title">
        <Heading label={heading} className="text-xl" />
        <Breadcrumbs label={heading} icon={icon} />
      </div>
      <div className="actions">
        {children}
      </div>
    </header>
  )
}

export default Header;




const breadcrumbs = (heading : string) => {
 
  switch (heading) {

    case "dashboard":
      return { heading, icon: dashbaordIcon }

    case "campaigns":
      return { heading, icon: campaignsIcon }

    case "leads":
      return { heading, icon: leadsIcon }

    case "users":
      return { heading, icon: usersIcon }

    default:
      return { heading, icon: dashbaordIcon }
  }
}
