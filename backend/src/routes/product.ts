
import { Router, Request, Response } from "express";
import {  verifyToken } from "../middleware/JWTtoken";
import { isBrand, isCategory, isDescription, isPrice, isProdcutName, isStockQuantity } from "../middleware/validators";
import { addProduct, addProductToCart, clearCart, getProducts, reduceProductFromCart, removeProductFromCart } from "../controllers/product";
import { upLoadFile } from "../middleware/fileUploader";
import cors from "cors";


const router = Router()



router.post("/addProduct", [isProdcutName, isDescription, isPrice, isCategory, isBrand, isStockQuantity],
verifyToken,
upLoadFile,
addProduct
)

router.get("/getProducts", getProducts)
// router.options('addProductToCart', cors())
router.patch("/addProductToCart", verifyToken, addProductToCart)
router.patch("/reduceProductInCart", verifyToken, reduceProductFromCart);
router.patch("/removeProductFromCart", verifyToken, removeProductFromCart);
router.patch("/clearProductFromCart", verifyToken, clearCart)
export default router;
