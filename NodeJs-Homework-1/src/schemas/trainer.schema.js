import joi from "joi";

export const trainerSchema = joi.object({
  firstName: joi.string().min(2).required(),
  lastName: joi.string().min(2).required(),
  age: joi.number().min(25).max(77).required(),
});

export const trainerUpdateSchema = joi.object({
  firstName: joi.string().min(2),
  lastName: joi.string().min(2),
  age: joi.number().min(25).max(77),
});
