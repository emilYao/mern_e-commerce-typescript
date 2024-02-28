
import { Router, Request, Response } from "express";
import {  verifyToken } from "../middleware/JWTtoken";
import { isBrand, isCategory, isDescription, isPrice, isProdcutName, isStockQuantity } from "../middleware/validators";
import { addProduct } from "../controllers/product";
import { upLoadFile } from "../middleware/fileUploader";


const router = Router()



router.post("/addProduct", [isProdcutName, isDescription, isPrice, isCategory, isBrand, isStockQuantity],
verifyToken,
upLoadFile,
addProduct
)

export default router;
