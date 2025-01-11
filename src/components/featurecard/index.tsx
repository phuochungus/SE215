import React, { FC } from 'react';

interface FeatureCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
}

const FeatureCard: FC<FeatureCardProps> = ({ icon, title, description }) => {
    return (
        <div className="bg-white rounded-xl p-6 flex flex-col items-center text-center shadow-sm">
            <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center mb-4">
                {icon}
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-700">{title}</h3>
            <p className=" text-gray-400">{description}</p>
        </div>
    );
};

export default FeatureCard;