// Here all the webhook endpoints are defined

import { Router } from 'express';
import { createOrder } from './aurora';
import { handleScreenStateChange } from './screen-state';

const webhooksRouter = Router();

webhooksRouter.post('/food-order-completed', async (req, res) => {
    await createOrder(req.body.orderNumber);
    res.status(204).send();
});

webhooksRouter.post('/screen-state-changed', async (req, res) => {
    const { desiredState } = req.body;
    try {
        await handleScreenStateChange(desiredState);
        res.status(204).send();
    } catch (error) {
        console.error('Error handling screen state change:', error);
        res.status(500).send('Internal Server Error');
    }
});

/**
 * Add more webhook endpoints here as needed.
 */

export default webhooksRouter;