import { BaseClient } from '@/api/base.client';
import { StockPrice, CreateStockPriceRequest, UpdateStockPriceRequest } from '@/api/types/StockPrice';

/**
 * Client for managing internal stock price data
 */
export class StockPriceClient extends BaseClient {
    constructor() {
        super('stock-prices');
    }

    async getAllStockPrices() {
        return await this.get<StockPrice[]>('prices');
    }

    async getStockPriceById(id: string) {
        return await this.get<StockPrice>(`price/${id}`);
    }

    async getStockPricesByTickerAndDateRange(ticker: string, startDate: string, endDate: string) {
        return await this.get<StockPrice[]>(`prices/${ticker}/${startDate}/${endDate}`);
    }

    async createStockPrice(createStockPriceDto: CreateStockPriceRequest) {
        return await this.post<StockPrice>('price', createStockPriceDto);
    }

    async createManyStockPrices(createStockPriceDtos: CreateStockPriceRequest[]) {
        return await this.post<StockPrice[]>('prices', createStockPriceDtos);
    }

    async updateStockPrice(id: string, updateStockPriceDto: UpdateStockPriceRequest) {
        return await this.patch<StockPrice>(`price/${id}`, updateStockPriceDto);
    }

    async deleteStockPrice(id: string) {
        return await this.delete(`price/${id}`);
    }

    async deleteManyStockPrices(ids: string[]) {
        // Use POST with DELETE method override for bulk operations with request body
        return await this.post<void>('prices/delete', { ids });
    }
}