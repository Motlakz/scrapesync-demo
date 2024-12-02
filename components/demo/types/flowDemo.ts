/* eslint-disable @typescript-eslint/no-explicit-any*/
import { Node, Edge } from '@xyflow/react';

export interface TaskInput {
  name: string;
  type: string;
  label: string;
}

export interface TaskOutput {
  name: string;
  type: string;
  label: string;
}

export interface Task {
  name: string;
  inputs: TaskInput[];
  outputs: TaskOutput[];
  process: (inputs: Record<string, any>) => Record<string, any>;
}

export interface TaskRegistry {
  [key: string]: Task;
}

export interface NodeData {
  type: string;
  inputs?: Record<string, any>;
  outputs?: Record<string, any>;
  onInputChange?: (name: string, value: string) => void;
  [key: string]: unknown;
}

export interface CustomNode extends Node {
    data: {
      type: string;
      inputs: Record<string, string>;
      outputs?: any;
      onInputChange?: (name: string, value: string) => void;
    };
}
  
export interface CustomEdge extends Edge {
    sourceHandle?: string;
    targetHandle?: string;
}