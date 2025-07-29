import { FinanceClient } from "../clients/finance.client";
import { StockPrice } from "../types/StockPrice";
import {
  createRecentDateRange,
  getMostRecentStockPrice,
} from "@/utils/stock-price.utils";
import { isSuccessResponse } from "@/types/clientResponse.type";

export class StockPriceService {
  private financeClient: FinanceClient;

  constructor() {
    this.financeClient = new FinanceClient();
  }

  async getMostRecentClosingPrice(ticker: string): Promise<StockPrice | null> {
    if (!ticker) return null;

    const { startDate, endDate } = createRecentDateRange(7);

    try {
      const response = await this.financeClient.fetchStockPrices(
        ticker,
        startDate,
        endDate
      );

      if (isSuccessResponse(response) && response.data.length > 0) {
        return getMostRecentStockPrice(response.data);
      }

      return null;
    } catch (error) {
      console.error(`Error fetching stock prices for ${ticker}:`, error);
      throw new Error(`Failed to fetch stock prices for ${ticker}`);
    }
  }
}
