
import {check, body, query} from "express-validator"

export const isFirstName= check("firstName", "first Name is required").isString().notEmpty()
export const isLastName= check("firstName", "first Name is required").isString().notEmpty()
export const isPassword = check("password").isString().isLength({ min: 8 })
export const isEmail = check("email").trim().isEmail().notEmpty().withMessage('valid email is required')
export const isRole = check("role").isString()
export const isVerifyOTP = check("otp").trim().isString().isLength({max:5, min:5}).withMessage("Invalid Verification Code")

export const isProdcutName = check("name").trim().isString().notEmpty();
export const isDescription = check("description").trim().isString().notEmpty();
export const isPrice = check("price").trim().isDecimal().notEmpty();
export const isCategory = check("category").trim().isString().notEmpty();
export const isBrand = check("brand").trim().isString();
export const isStockQuantity = check("stockQuantity").isNumeric();

