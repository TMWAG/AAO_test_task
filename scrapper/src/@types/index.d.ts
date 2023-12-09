export interface ICDResponse {
  time: {
    updated: string;
    updatedISO: string;
    updateduk: string;
  };
  disclaimer: string;
  chartName: string;
  bpi: Record<
    string,
    {
      code: string;
      symbol: string;
      rate: string;
      description: string;
      rate_float: number;
    }
  >;
}