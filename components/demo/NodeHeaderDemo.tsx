import React from 'react';
import { TaskRegistry } from './types/flowDemo';

interface NodeHeaderProps {
  taskType: keyof TaskRegistry;
  registry: TaskRegistry;
}

export const NodeHeader: React.FC<NodeHeaderProps> = ({ taskType, registry }) => {
  const task = registry[taskType];
  return (
    <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-t-lg mb-2">
      <h3 className="font-bold text-sm text-gray-800 dark:text-gray-200">
        {task.name}
      </h3>
    </div>
  );
};
