import express, { Request, Response } from 'express';
import {Item} from "../models/items";


const router = express.Router();

router.get('/api/cart',async (req: Request, res: Response) => {
    const cart = await Item.find({
        userId: req.currentUser?.id || req.cookies.id,
    }).populate('item');

    res.send(cart);
});

export { router as indexCartRouter };
