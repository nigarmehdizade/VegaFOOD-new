import express from 'express'
import { deleteBasket, getBasket, postBasket } from '../controllers/basketContoller.js'
import { deleteWishlist, getWishlist, postWishlist } from '../controllers/wishlistContoller.js'
import { deleteProduct, getProducts, postProduct } from '../controllers/productContoroller.js'


const router = express.Router()

router
    .get('/pro', getProducts)
    .post('/pro', postProduct)
    .delete('/pro', deleteProduct)

    .get('/basket', getBasket)
    .post('/basket', postBasket)
    .delete('/basket/:id', deleteBasket)

    .get('/wishlist', getWishlist)
    .post('/wishlist', postWishlist)
    .delete('/wishlist/:id', deleteWishlist)
export default router
