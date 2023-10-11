interface ErrorResponse {
  error: {
    message: string;
    err?: any;
  };
  status?: number;
}
