"use client"

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { toast } from "sonner";

interface InvoiceBtnProps {
  id: string;
}

const InvoiceBtn = ({ id }: InvoiceBtnProps) => {
    const generateInvoice = async () => {
        try {
            const response = await fetch(`/api/billing/invoice/${id}`, {
                method: 'GET',
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData?.error || 'Failed to generate invoice');
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `invoice-${id}.pdf`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            a.remove();
        } catch (error) {
            console.error('Error generating invoice:', error);
            toast.error(`Error: ${error}`);
        }
    };

    return (
        <Button 
            variant="ghost" 
            size="sm" 
            onClick={generateInvoice}
            className="text-muted-foreground dark:hover:text-violet-400 hover:text-primary"
        >
            <Download className="h-4 w-4 mr-1" />
            Download
        </Button>
    );
};

export default InvoiceBtn;