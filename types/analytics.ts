export type Period = {
    month: number;
    year: number;
};

export type ReportUpdate = {
    timestamp: string;
    type: 'success' | 'warning' | 'info';
    title: string;
    description: string;
};
