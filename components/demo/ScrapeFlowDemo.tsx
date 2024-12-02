/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import React, { useCallback, useEffect } from 'react';
import {
  ReactFlow,
  Controls,
  Background,
  BackgroundVariant,
  Connection,
  addEdge,
  useNodesState,
  useEdgesState,
  ConnectionLineType,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { NodeComponent } from './NodeComponentDemo';
import { taskRegistry } from './TaskRegistryDemo';
import { CustomEdge, CustomNode } from './types/flowDemo';
import DeletableEdge from './DeletableEdge';

const nodeTypes = {
  node: (props: any) => <NodeComponent {...props} registry={taskRegistry} />,
};

const edgeTypes = {
  default: DeletableEdge,
};

function ScrapeFlowDemo() {
  const [nodes, setNodes, onNodesChange] = useNodesState<CustomNode>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<CustomEdge>([]);

  // Process workflow when inputs change
  const processWorkflow = useCallback(
    (updatedNodes: CustomNode[]) => {
      const processedNodes = updatedNodes.map((node) => {
        const task = taskRegistry[node.data.type];
        const outputs = task.process(node.data.inputs || {});
        return {
          ...node,
          data: {
            ...node.data,
            outputs,
          },
        };
      });

      setNodes(processedNodes);
    },
    [setNodes]
  );

  // Input change handler
  const handleInputChange = useCallback(
    (nodeId: string, inputName: string, value: string) => {
      setNodes((prevNodes) => {
        const updatedNodes = prevNodes.map((node) => {
          if (node.id === nodeId) {
            const newInputs = {
              ...node.data.inputs,
              [inputName]: value,
            };

            return {
              ...node,
              data: {
                ...node.data,
                inputs: newInputs,
              },
            };
          }
          return node;
        });

        processWorkflow(updatedNodes);
        return updatedNodes;
      });
    },
    [setNodes, processWorkflow]
  );

  // Initialize nodes with input change handler
  useEffect(() => {
    const initialNodes: CustomNode[] = [
      {
        id: '1',
        type: 'node',
        position: { x: 100, y: 100 },
        data: {
          type: 'link-fetcher',
          inputs: { url: 'https://example.com' },
          onInputChange: (name, value) => handleInputChange('1', name, value),
        },
      },
      {
        id: '2',
        type: 'node',
        position: { x: 400, y: 100 },
        data: {
          type: 'text-processor',
          inputs: { template: 'Summarize content' },
          onInputChange: (name, value) => handleInputChange('2', name, value),
        },
      },
      {
        id: '3',
        type: 'node',
        position: { x: 700, y: 100 },
        data: {
          type: 'json-formatter',
          inputs: {},
          onInputChange: (name, value) => handleInputChange('3', name, value),
        },
      },
    ];

    setNodes(initialNodes);

    const initialEdges: CustomEdge[] = [
      {
        id: 'e1-2',
        source: '1',
        target: '2',
        sourceHandle: 'content',
        targetHandle: 'input',
        type: 'default',
        animated: true,
      },
      {
        id: 'e2-3',
        source: '2',
        target: '3',
        sourceHandle: 'processed',
        targetHandle: 'input',
        type: 'default',
        animated: true,
      },
    ];

    setEdges(initialEdges);
  }, [setNodes, setEdges, handleInputChange]);

  const onConnect = useCallback(
    (params: Connection) => {
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            type: 'default',
            animated: true,
          },
          eds
        )
      );
    },
    [setEdges]
  );

  return (
    <div className="h-[400px] dark:bg-white/10 bg-slate-900/10 w-full border-2 dark:border-gray-200 border-gray-700 rounded-lg overflow-hidden">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        connectionLineType={ConnectionLineType.Straight}
        fitView
        attributionPosition="bottom-right"
      >
        <Controls className="text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700" />
        <Background
          variant={BackgroundVariant.Dots}
          color="#E0E0E0"
          className="dark:opacity-20"
          gap={16}
          size={1}
        />
      </ReactFlow>
    </div>
  );
}

export default ScrapeFlowDemo;
