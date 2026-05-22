/**
 * Manual test script for screen state switching.
 * Calls handleScreenStateChange directly, bypassing HTTP and signature auth.
 *
 * Usage (after npm run build):
 *   node dist/test-screen-state.js <state>
 *
 * Or with the npm script:
 *   npm run test-screen-state -- <state>
 *
 * Where <state> is one of: open | last-call | closed | evacuation
 */

import 'dotenv/config';
import { handleScreenStateChange } from './screen-state';

const state = process.argv[2] as 'open' | 'last-call' | 'closed' | 'evacuation';
const validStates = ['open', 'last-call', 'closed', 'evacuation'];

if (!state || !validStates.includes(state)) {
    console.error(`Usage: node dist/test-screen-state.js <state>`);
    console.error(`Valid states: ${validStates.join(' | ')}`);
    process.exit(1);
}

console.log(`Switching screens to state: "${state}"...`);

handleScreenStateChange(state)
    .then(() => console.log('Done.'))
    .catch((err) => {
        console.error('Failed:', err.message);
        process.exit(1);
    });
