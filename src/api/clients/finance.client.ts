import { BaseClient } from '@/api/base.client';
import { StockPrice } from '@/api/types/StockPrice';
import { StockReport } from '@/api/types/StockReport';

/**
 * Client for fetching financial data from external sources
 * Unlike StockPriceClient and StockReportClient which manage internal data,
 * this client is responsible for retrieving fresh data from external financial APIs
 */
export class FinanceClient extends BaseClient {
    constructor() {
        super('finance');
    }

    async fetchStockPrices(ticker: string, startDate: string, endDate: string) {
        return await this.get<StockPrice[]>(
            `fetch-stock-prices/${ticker}`, 
            { params: { startDate, endDate } }
        );
    }

    async fetchStockReports(ticker: string, reportType: string) {
        return await this.get<StockReport[]>(
            `fetch-stock-reports/${ticker}`,
            { params: { reportType } }
        );
    }
}
