import { z } from "zod";

const stockPriceSchema = z.object({
    _id: z.string(),
    ticker: z.string(),
    date: z.date(),
    open: z.number(),
    close: z.number(),
    high: z.number(),
    low: z.number(),
    volume: z.number(),
});

export type StockPrice = z.infer<typeof stockPriceSchema>;

export type CreateStockPriceRequest = Pick<
    StockPrice,
    "ticker" | "date" | "open" | "close" | "high" | "low" | "volume"
>;

export type UpdateStockPriceRequest = Partial<CreateStockPriceRequest> & {
    _id: string;
};

export type StockPriceRequest = {
    ticker: string;
    startDate: string;
    endDate: string;
};

export type StockPriceResponse = {
    data: StockPrice[];
};

export type StockPriceErrorResponse = {
    statusCode: number;
    message: string;
    error: string;
};
