import { BaseClient } from '@/api/base.client';
import { StockReport, CreateStockReportRequest, UpdateStockReportRequest } from '@/api/types/StockReport';

/**
 * Client for managing internal stock report data
 */
export class StockReportClient extends BaseClient {
    constructor() {
        super('stock-reports');
    }

    async getAllStockReports() {
        return await this.get<StockReport[]>('reports');
    }

    async getStockReportById(id: string) {
        return await this.get<StockReport>(`report/${id}`);
    }

    async getStockReportsByTickerAndReportType(ticker: string, reportType: string) {
        return await this.get<StockReport[]>(`reports/${ticker}/${reportType}`);
    }

    async createStockReport(createStockReportDto: CreateStockReportRequest) {
        return await this.post<StockReport>('report', createStockReportDto);
    }

    async createManyStockReports(createStockReportDtos: CreateStockReportRequest[]) {
        return await this.post<StockReport[]>('reports', createStockReportDtos);
    }

    async updateStockReport(id: string, updateStockReportDto: UpdateStockReportRequest) {
        return await this.patch<StockReport>(`report/${id}`, updateStockReportDto);
    }

    async deleteStockReport(id: string) {
        return await this.delete(`report/${id}`);
    }

    async deleteManyStockReports(ids: string[]) {
        // Use POST with DELETE method override for bulk operations with request body
        return await this.post<void>('reports/delete', { ids });
    }
}