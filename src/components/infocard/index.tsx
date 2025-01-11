import React, { FC } from 'react';

interface InfoCardProps {
    imageSrc: string;
    title: string;
    description: string;
    linkText: string;
    linkHref: string;
}

const InfoCard: FC<InfoCardProps> = ({ imageSrc, title, description, linkText, linkHref }) => {
    return (
        <div className="flex flex-col items-center bg-white rounded-xl shadow-sm">
            <img src={imageSrc} alt={title} className="rounded-t-xl" />
            <div className="p-6 text-center">
                <h3 className="text-xl font-semibold mb-2 text-gray-700">{title}</h3>
                <p className="text-gray-400 mb-4">{description}</p>
                <a href={linkHref} className="text-primary font-medium text-gray-800">
                    {linkText} →
                </a>
            </div>
        </div>
    );
};

export default InfoCard;