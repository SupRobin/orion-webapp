import express, { Request, Response } from 'express';
import {Cart} from "../models/cart";


const router = express.Router();

router.get('/api/cart',async (req: Request, res: Response) => {

    const cart = await Cart.findOne({
        //Todo: get session Id from use here before so we can cache his for a day maybe?
        userId: req.currentUser?.id || req.session
    }).populate('items.itemId');

    if(!cart){
        cart!.set({items: []})
    }

    res.send(cart);
});

export { router as indexCartRouter };
