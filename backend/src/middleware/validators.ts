
import {check, body, query} from "express-validator"

export const isFirstName= check("firstName", "first Name is required").isString().notEmpty()
export const isLastName= check("firstName", "first Name is required").isString().notEmpty()
export const isPassword = check("password").isString().isLength({ min: 8 })
export const isEmail = check("email").trim().isEmail().notEmpty().withMessage('valid email is required')
