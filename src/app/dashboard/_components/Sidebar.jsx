'use client';

import Link from 'next/link';
import { LibraryBig, MessageSquare } from 'lucide-react';
import { usePathname } from 'next/navigation';


const Sidebar = () => {

  const menuList = [

    {id: 1, name: 'My Forms', icon: <LibraryBig />, path: '/dashboard'},
    {id: 2, name: 'Responses', icon: <MessageSquare />,path: '/dashboard/responses'}

  ]

  const path = usePathname();

  return (
    <div className="h-screen shadow-md border">

        <div className='p-5'>
            {menuList.map((menu) => (
                <Link href={menu.path} key={menu.id} className={`flex items-center gap-3 p-4 mb-3 text-gray-500 hover:bg-primary hover:text-white hover:rounded-lg hover:cursor-pointer ${path === menu.path && 'bg-primary text-white rounded-lg'}`}>

                    {menu.icon}

                    {menu.name}

                </Link>
            ))}
        </div>

    </div>
  )
}

export default Sidebar;