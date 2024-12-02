import { TaskRegistry } from "./types/flowDemo";

export const taskRegistry: TaskRegistry = {
  'link-fetcher': {
    name: 'Link Fetcher',
    inputs: [{ name: 'url', type: 'string', label: 'URL' }],
    outputs: [{ name: 'content', type: 'json', label: 'Fetched Content' }],
    process: (inputs) => ({
      content: inputs.url ? `Fetched content from ${inputs.url}` : '',
    }),
  },
  'text-processor': {
    name: 'Text Processor',
    inputs: [
      { name: 'input', type: 'json', label: 'Input Content' },
      { name: 'template', type: 'string', label: 'Processing Template' },
    ],
    outputs: [{ name: 'processed', type: 'string', label: 'Processed Text' }],
    process: (inputs) => ({
      processed:
        inputs.input && inputs.template
          ? `${inputs.template}: ${inputs.input}`
          : '',
    }),
  },
  'json-formatter': {
    name: 'JSON Formatter',
    inputs: [{ name: 'input', type: 'string', label: 'Input Text' }],
    outputs: [{ name: 'formatted', type: 'json', label: 'Formatted JSON' }],
    process: (inputs) => ({
      formatted: inputs.input
        ? JSON.stringify({ text: inputs.input }, null, 2)
        : '',
    }),
  },
};
