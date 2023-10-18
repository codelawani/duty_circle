function handleError(error: unknown, errorMsg: string): never {
  // console.error(`${errorMsg}: ${error}`);
  // if (error instanceof ZodError) {
  //   const errMsg = fromZodError(error);
  //   // console.log(errMsg);
  // }
  throw error;
// constructor() {
//   this.get = withErrorHandling(this.get, "Failed to get circle");
//   this.getAll = withErrorHandling(this.getAll, "Failed to get all circles");
//   this.circleExists = withErrorHandling(
//     this.circleExists,
//     "Failed to get circle"
//   );
//   this.userInCircle = withErrorHandling(this.userInCircle, "Action Failed");
}

interface Method<T> {
  (...args: any[]): Promise<T>;
}

export function withErrorHandling<T>(
  method: Method<T>,
  errorMsg: string
): Method<T> {
  return async (...args: any[]): Promise<T> => {
    try {
      const result = await method(...args);
      return result;
    } catch (error) {
      handleError(error, errorMsg);
    }
  };
}
