import React, { FC } from 'react';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
}

const SectionTitle: FC<SectionTitleProps> = ({ title, subtitle }) => {
  return (
    <div className="text-center mb-12">
      <h2 className="text-3xl font-bold text-gray-800 mb-2">{title}</h2>
      {subtitle && <p className="text-gray-400">{subtitle}</p>}
    </div>
  );
};

export default SectionTitle;