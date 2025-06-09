// Here all the webhook endpoints are defined

import { Router } from 'express';
import { createOrder } from './aurora';

const webhooksRouter = Router();



webhooksRouter.post('/food-order-completed', (req, res) => {
    createOrder(req.body.orderNumber);
    res.status(204).send();
})

export default webhooksRouter;