import { StockReport } from "@/api/types/StockReport";
import { formatDateToStringSlash } from "@/utils/date-parser.utils";

/**
 * Extracts all available dates from a stock report's content
 */
export const extractDatesFromReport = (report: StockReport): string[] => {
  if (!report.content || typeof report.content !== "object") {
    return [];
  }

  return Object.keys(report.content)
    .map((date) => {
      const parsedDate = new Date(date);
      return formatDateToStringSlash(parsedDate);
    })
    .sort((a, b) => new Date(b).getTime() - new Date(a).getTime()); // Most recent first
};

/**
 * Gets the most recent report date from content
 */
export const getMostRecentReportDate = (report: StockReport): string => {
  const dates = extractDatesFromReport(report);
  return dates.length > 0
    ? dates[0]
    : formatDateToStringSlash(new Date(report.date));
};

/**
 * Extracts financial data for a specific date, excluding metadata
 */
export const getFinancialDataForDate = (
  report: StockReport,
  targetDate: string
): Record<string, string> => {
  if (!report.content || typeof report.content !== "object") {
    return {};
  }

  // Find the original date key that matches our formatted target date
  const originalDateKey = Object.keys(report.content).find((key) => {
    const parsedDate = new Date(key);
    const formattedDate = formatDateToStringSlash(parsedDate);
    return formattedDate === targetDate;
  });

  if (!originalDateKey || !report.content[originalDateKey]) {
    return {};
  }

  const contentData = report.content[originalDateKey];

  // Remove metadata fields and return only financial data
  const { date, symbol, reportType, ...financialData } = contentData;
  return financialData;
};

/**
 * Creates flattened report entries for table display
 */
export interface FlattenedReportEntry {
  id: string;
  ticker: string;
  date: string;
  reportType: string;
  financialData: Record<string, string>;
}

export const flattenReportsForTable = (
  reports: StockReport[]
): FlattenedReportEntry[] => {
  const flattened: FlattenedReportEntry[] = [];

  reports.forEach((report) => {
    const availableDates = extractDatesFromReport(report);

    availableDates.forEach((date) => {
      flattened.push({
        id: `${report._id}-${date}`,
        ticker: report.ticker,
        date: date,
        reportType: report.reportType,
        financialData: getFinancialDataForDate(report, date),
      });
    });
  });

  return flattened;
};
