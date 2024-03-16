
import {check, body, query} from "express-validator"

export const isFirstName= check("firstName", "first Name is required").isString().notEmpty()
export const isLastName= check("firstName", "first Name is required").isString().notEmpty()
export const isPassword = check("password").isString().isLength({ min: 8 })
export const isEmail = check("email").trim().isEmail().notEmpty().withMessage('valid email is required')
export const isRole = check("role").isString()
export const isVerifyOTP = check("otp").trim().isString().isLength({max:5, min:5}).withMessage("Invalid Verification Code")

export const isProdcutName = check("name").trim().isString().notEmpty().withMessage("name is required");
export const isDescription = check("description").trim().isString().notEmpty().withMessage("Description is required");
export const isPrice = check("price").trim().isString().notEmpty().withMessage("price is required");
export const isCategory = check("category").trim().isString().notEmpty().withMessage("category is required");
export const isBrand = check("brand").trim().isString().withMessage("Brand is required");
export const isStockQuantity = check("stockQuantity").isString().withMessage("stock quantity is required");

