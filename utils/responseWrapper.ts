import { Request, Response, NextFunction } from "express";

// Middleware to wrap responses
const responseWrapper = (req: Request, res: Response, next: NextFunction) => {
  // Store original `res.json` method
  const originalJson = res.json;

  console.log(originalJson);

  // Override `res.json` to wrap the response
  res.json = function (body: any) {
    const formattedResponse = {
      statusCode: res.statusCode.toString(),
      message: res.statusCode === 200 ? "Success" : body.error,
      data: res.statusCode === 200 ? body : null,
    };

    // Call the original `res.json` method with the formatted response
    return originalJson.call(this, formattedResponse);
  };

  next();
};

export default responseWrapper;
