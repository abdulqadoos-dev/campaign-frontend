'use client'
import Heading from "@ui/heading";
import Breadcrumbs from "@ui/breadcrumbs";
import { usePathname } from 'next/navigation';

import leadsIcon from '@icons/leads.svg';
import usersIcon from '@icons/users.svg';
import dashbaordIcon from '@icons/dashboard.svg';
import campaignsIcon from '@icons/campaigns.svg';


const breadcrumbs = () => {
  const heading = usePathname().replace("/", "");
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

const Header = () => {

  const { heading, icon } = breadcrumbs();

  return (
    <header className="mb-4 flex justify-between items-center">

      <div className="title">
        <Breadcrumbs label={heading} icon={icon} />
        <Heading label={heading} className="text-xl" />
      </div>

      <div className="actions">

      </div>

    </header>

  )

}

export default Header;