/**
 * Manual test script for food order creation.
 * Calls createOrder directly, bypassing HTTP and signature auth.
 *
 * Usage (after npm run build):
 *   node dist/test-food-order.js <orderNumber>
 *
 * Or with the npm script:
 *   npm run test-food-order -- <orderNumber>
 */

import 'dotenv/config';
import { createOrder } from './aurora';

const orderNumber = Number(process.argv[2]);

if (!process.argv[2] || isNaN(orderNumber)) {
    console.error('Usage: node dist/test-food-order.js <orderNumber>');
    console.error('Example: npm run test-food-order -- 42');
    process.exit(1);
}

console.log(`Creating order: ${orderNumber}...`);

createOrder(orderNumber)
    .then(() => console.log('Done.'))
    .catch((err) => {
        console.error('Failed:', err.message);
        process.exit(1);
    });
