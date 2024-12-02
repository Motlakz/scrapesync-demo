import React, { ReactNode } from 'react';

interface NodeCardProps {
  children: ReactNode;
  nodeId: string;
  isSelected: boolean;
}

export const NodeCard: React.FC<NodeCardProps> = ({ children, isSelected }) => (
  <div
    className={`
      border rounded-lg w-[250px] bg-white dark:bg-gray-800 shadow-md relative
      ${isSelected ? 'border-violet-500 dark:border-violet-400 border-2' : 'border-gray-300 dark:border-gray-600'}
    `}
  >
    {children}
  </div>
);
