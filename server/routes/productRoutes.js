import {Router} from "express";
import {
    addProduct,
    deleteProductById,
    getProductById,
    getProducts,
    updateProductById
} from "../controller/productController.js";
import {isAuthenticated, isAuthorized} from "../middleware/isAuthenticated.js";

const productRouter = Router();

productRouter
    .route('/')
    .get(isAuthenticated,isAuthorized(true),getProducts)
    .post(addProduct);

productRouter
    .route('/:id')
    .get(getProductById)
    .put(updateProductById)
    .delete(deleteProductById);

export default productRouter;