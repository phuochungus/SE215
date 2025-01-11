import React, { FC, useState } from 'react';

interface UserCardProps {
    name: string;
    status: string;
    avatarSrc: string;
}

const UserCard: FC<UserCardProps> = ({ name, status, avatarSrc }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="bg-white rounded-lg shadow-md">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center p-4 w-full justify-between"
            >
                <div className="flex items-center">
                    <img src={avatarSrc} alt={name} className="w-10 h-10 rounded-full mr-3" />
                    <div>
                        <h3 className="font-medium text-gray-800">{name}</h3>
                        <p className="text-sm text-gray-500">{status}</p>
                    </div>
                </div>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-5 w-5 text-gray-500 transform transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                    />
                </svg>
            </button>
            {isOpen && (
                <div className="p-4 border-t border-gray-100">
                    {/* Additional actions or content for the user can go here */}
                </div>
            )}
        </div>
    );
};

export default UserCard;