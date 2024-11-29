import { Request, Response, NextFunction } from "express";
import { AnyObjectSchema } from "yup";

export const validateRequest =
  (schema: AnyObjectSchema) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = await schema.validate(req.body, {
        abortEarly: false, // Collect all validation errors
        stripUnknown: true, // Remove unknown fields from the request
      });

      next();
    } catch (error: any) {
      res.status(400).json({
        error: "Validation error",
        details: error.errors, // Array of validation error messages
      });
    }
  };