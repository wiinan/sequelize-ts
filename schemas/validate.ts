import { NextFunction, Response } from "express";

const Validate = (schema: any) => {
  return async (req: any, res: Response, next: NextFunction): Promise<void> => {
    try {
      req.data = Object.keys(req.body).length
        ? await schema.body.validate(req.body)
        : null;

      req.filter = Object.keys(req.params).length
        ? await schema.params.validate(req.params)
        : null;

      req.filter = Object.keys(req.query).length
        ? { ...req.filter, ...(await schema.params.validate(req.query)) }
        : req.filter || null;

      return next();
    } catch (err) {
      res.status(401).json({ error: err.message });
    }
  };
};

export default Validate;
