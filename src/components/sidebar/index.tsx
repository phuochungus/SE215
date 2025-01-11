import React, { FC } from 'react';
import Link from 'next/link';

interface SidebarItem {
    text: string;
    href: string;
    icon?: React.ReactNode;
}

interface SidebarProps {
    items: SidebarItem[];
}

const Sidebar: FC<SidebarProps> = ({ items }) => {
    return (
        <aside className="bg-[#4A436C] w-64 p-4 flex flex-co mt-12l">
            <div className="mb-8">
            </div>
            <nav className="space-y-2 flex-1">
                {items.map((item, index) => (
                    <Link href={item.href} key={index} className={`flex items-center p-3 rounded-md hover:bg-purple-700/10 cursor-pointer`}>
                        {item.icon && <span className="mr-3">{item.icon}</span>}
                        <span className="text-gray-200 font-medium">{item.text}</span>
                    </Link>
                ))}
            </nav>
        </aside>
    );
};

export default Sidebar;