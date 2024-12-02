/* eslint-disable @typescript-eslint/no-explicit-any*/
import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { TaskRegistry } from './types/flowDemo';
import { NodeCard } from './NodeCardDemo';
import { NodeHeader } from './NodeHeaderDemo';

interface NodeComponentProps {
  data: {
    type: keyof TaskRegistry;
    inputs?: Record<string, any>;
    outputs?: Record<string, any>;
    onInputChange?: (name: string, value: string) => void;
  };
  selected: boolean;
  id: string;
  registry: TaskRegistry;
}

export const NodeComponent: React.FC<NodeComponentProps> = ({
  data,
  selected,
  id,
  registry,
}) => {
  const task = registry[data.type];

  return (
    <NodeCard nodeId={id} isSelected={selected}>
      <NodeHeader taskType={data.type} registry={registry} />

      {/* Input Handles and Inputs */}
      <div className="mb-2 p-2">
        <div className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
          Inputs:
        </div>
        {task.inputs.map((input) => (
          <div key={input.name} className="relative mb-1 flex items-center">
            <Handle
              type="target"
              position={Position.Left}
              id={input.name}
              className="w-2 h-2 bg-gray-400 dark:bg-gray-600 rounded-full absolute -left-1"
            />
            <div className="text-xs mr-2 text-gray-500 dark:text-gray-400 w-16">
              {input.label}:
            </div>
            <input
              type="text"
              value={data.inputs?.[input.name] || ''}
              onChange={(e) => data.onInputChange?.(input.name, e.target.value)}
              className="flex-grow border rounded px-2 py-1 text-xs 
                bg-white dark:bg-gray-700 
                border-gray-300 dark:border-gray-600
                text-gray-800 dark:text-gray-200"
              placeholder="Enter value"
            />
          </div>
        ))}
      </div>

      {/* Output Handles */}
      <div>
        <div className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
          Outputs:
        </div>
        {task.outputs.map((output) => (
          <div key={output.name} className="relative mb-1 mr-2 flex items-center">
            <Handle
              type="source"
              position={Position.Right}
              id={output.name}
              className="w-2 h-2 bg-green-400 dark:bg-green-600 rounded-full absolute -right-1"
            />
            <div className="text-xs mr-2 text-gray-500 dark:text-gray-400 w-16">
              {output.label}:
            </div>
            <div
              className="flex-grow border rounded px-2 py-1 text-xs 
                bg-green-50 dark:bg-green-900/30 
                border-green-200 dark:border-green-700
                text-green-800 dark:text-green-300 truncate"
            >
              {data.outputs?.[output.name] || 'Waiting...'}
            </div>
          </div>
        ))}
      </div>
    </NodeCard>
  );
};
