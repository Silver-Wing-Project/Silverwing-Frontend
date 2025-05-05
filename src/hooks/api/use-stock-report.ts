import { useEffect, useState } from 'react';
import { BaseClient } from '@/api/base.client';
import { ClientResponse } from '@/types/clientResponse.type';
import { StockReport } from '@/api/types/StockReport';

const client = new BaseClient();

export const useStockReport = () => {
    const [report, setReport] = useState<StockReport | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchReport = async () => {
            setLoading(true);
            setError(null);

            try {
                const response: ClientResponse<StockReport> = await client.get<StockReport>('stock/report');
                if ('data' in response) {
                    setReport(response.data);
                } else {
                    setError('Invalid response format');
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Unknown error');
            } finally {
                setLoading(false);
            }
        };

        fetchReport();
    }, []);

    return { report, loading, error };
};