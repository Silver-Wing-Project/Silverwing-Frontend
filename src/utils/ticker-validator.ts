import { ApiError } from "@/api/config/api-error";

export class TickerValidator {
  static validate(ticker: string): void {
    if (!ticker?.trim()) {
      throw new ApiError(400, "Ticker is required and cannot be empty", "Bad Request");
    }
    
    if (ticker.trim().length > 10) {
      throw new ApiError(400, "Ticker symbol too long", "Bad Request");
    }
    
    if (!/^[A-Z0-9.-]+$/i.test(ticker.trim())) {
      throw new ApiError(400, "Invalid ticker format", "Bad Request");
    }
  }
  
  static normalize(ticker: string): string {
    return ticker.trim().toUpperCase();
  }
}