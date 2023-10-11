function handleError(error: unknown, errorMsg: string): never {
  // console.error(`${errorMsg}: ${error}`);
  // if (error instanceof ZodError) {
  //   const errMsg = fromZodError(error);
  //   // console.log(errMsg);
  // }
  throw error;
}

export function withErrorHandling<T>(
  method: (...args: any[]) => Promise<T>,
  errorMsg: string
): (...args: any[]) => Promise<T> {
  return async (...args: any[]): Promise<T> => {
    try {
      const result = await method(...args);
      return result;
    } catch (error) {
      handleError(error, errorMsg);
    }
  };
}
