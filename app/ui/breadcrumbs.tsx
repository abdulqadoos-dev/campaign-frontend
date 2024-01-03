
import Link from 'next/link';
import Image from 'next/image';


import Dashboard from '../public/icons/dashboard.svg';
import ChevronRight from '../public/icons/chevron-right.svg';

const Breadcrumbs = () => {
  return (
    <nav className="flex my-2">
      <ol className="flex items-center space-x-2">
        <li>
          <div>
            <Link href="/dashboard" className="text-zinc-400 hover:text-zinc-500">
              <Image src={Dashboard} alt="Dashboard Icon" width={20} height={20} />
              <span className="sr-only">Dashboard</span>
            </Link>
          </div>
        </li>

        <li>
          <div className="flex items-center">
            <Image src={ChevronRight} alt="Dashboard Icon" width={20} height={20} />
            <Link href="/dashboard" className="text-zinc-400 hover:text-zinc-500 ml-2 text-sm"> Page</Link>
          </div>
        </li>
        
      </ol>
    </nav>
  )
}

export default Breadcrumbs;
