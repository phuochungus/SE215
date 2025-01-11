import React, { FC } from 'react';

interface StatsCardProps {
    icon: React.ReactNode;
    value: string | number;
    label: string;
}

const StatsCard: FC<StatsCardProps> = ({ icon, value, label }) => {
    return (
        <div className="flex flex-col items-center">
            <div className="mb-2">{icon}</div>
            <p className="text-2xl font-semibold text-gray-800">{value}</p>
            <p className="text-gray-400">{label}</p>
        </div>
    );
};

export default StatsCard;