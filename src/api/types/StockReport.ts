import { z } from "zod";

export const stockReportSchema = z.object({
    _id: z.string(),
    ticker: z.string(),
    date: z.date(),
    reportType: z.string(),
    content: z.record(z.string(), z.any()),
});

export type StockReport = z.infer<typeof stockReportSchema>;

export type CreateStockReportRequest = Pick<
    StockReport,
    "ticker" | "date" | "reportType" | "content"
>;

export type UpdateStockReportRequest = Partial<CreateStockReportRequest> & {
    _id: string;
};

export type StockReportRequest = {
    ticker: string;
    startDate: string;
    endDate: string;
};

export type StockReportResponse = {
    data: StockReport[];
};

export type StockReportErrorResponse = {
    statusCode: number;
    message: string;
    error: string;
};
