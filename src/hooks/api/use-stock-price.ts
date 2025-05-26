import { useEffect, useState } from 'react';
import { BaseClient } from '@/api/base.client';
import { ClientResponse } from '@/types/clientResponse.type';
import { StockPrice } from '@/api/types/StockPrice';

const client = new BaseClient();

export const useStockPrice = (symbol: string) => {
    const [stockPrice, setStockPrice] = useState<StockPrice | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                const response: ClientResponse<StockPrice> = await client.get<StockPrice>(`stock/${symbol}/quote`);
                if ('data' in response) {
                    setStockPrice(response.data);
                } else {
                    setError('Invalid response format');
                }
            } catch (err) {
                setError('Error fetching stock price');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [symbol]);

    return { stockPrice, loading, error };
};