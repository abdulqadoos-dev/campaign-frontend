
import Link from 'next/link';
import Image from 'next/image';

import ChevronRight from '@icons/chevron-right.svg';


interface Props {
  label: string;
  icon: string;
}

const Breadcrumbs: React.FC<Props> = ({ label, icon }) => {
  return (
    <nav className="flex my-2">
      <ol className="flex items-center space-x-2">
        <li>
          <div>
            <Link href="/dashboard" className="text-zinc-400 hover:text-zinc-500">
              <Image src={icon} alt="Dashboard Icon" width={20} height={20} />
              <span className="sr-only">{label}</span>
            </Link>
          </div>
        </li>

        <li>
          <div className="flex items-center">
            <Image src={ChevronRight} alt="Dashboard Icon" width={20} height={20} />
            <Link href={`/${label}`} className="text-zinc-400 hover:text-zinc-500 ml-2 text-sm"> {label}</Link>
          </div>
        </li>

      </ol>
    </nav>
  )
}

export default Breadcrumbs;
