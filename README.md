## Star wind

Star wind is the layer between Starcommunity webhooks and Aurora, it translates webhooks to actions in Aurora. It fulfills partly the same goal as [Hubble-Order-Manager](https://github.com/gewis/hubble-order-manager), but it extensible for all the webhooks.

#### Incoming webhooks
In `src/webhooks.ts` all the webhooks are specified, from [the Starcommunity API](https://docs.starcommunity.app/docs/webhooks/intro). Each webhook triggers a certain amount of actions in Aurora.

| Endpoint | Starcommunity webhook | Aurora action |
|---|---|---|
| `POST /food-order-completed` | `FoodOrderCompletedWebhook` | Adds the order to Aurora so it appears on screens |
| `POST /screen-state-changed` | `ScreenStateChangedWebhook` | Switches all screens to the desired state (see below) |

##### Screen states

| `desiredState` | Effect |
|---|---|
| `open` | Switches all screens to the carousel handler (regular operation) |
| `last-call` | Switches all screens to the static poster handler and shows the last call poster |
| `closed` | Switches all screens to the static poster handler and shows the closed poster |
| `evacuation` | Switches all screens to the static poster handler and shows the evacuation poster |

The static poster IDs and handler names are configured via environment variables (see `.env-example`).

#### Outgoing Aurora actions
In `src/aurora.ts` all the actions are defined that you can take in Aurora.

### Manual testing

Both webhooks can be tested directly against a live Aurora instance without needing Starcommunity to fire the webhook. The scripts bypass HTTP and signature auth and call the Aurora API directly.

**Test a screen state change:**
```bash
npm run test-screen-state -- <state>
# e.g.
npm run test-screen-state -- last-call
npm run test-screen-state -- open
```

Valid states: `open`, `last-call`, `closed`, `evacuation`

**Test a food order:**
```bash
npm run test-food-order -- <orderNumber>
# e.g.
npm run test-food-order -- 42
```

### Relation to [Hubble Order Manager](https://github.com/Hubble-Community-Cafe/Hubble-Order-Manager)
This project is a simple stateless service that translates webhooks to Aurora actions. Hubble Order Manager also does that specifically for orders, but also does more, such as adding orders outside of Starcommunity, displaying orders to users, and storing orders for a short time. This does mean that orders propagate via both this service and Hubble Order Manager, but Aurora can handle this, and it allows for one of these services to break while orders still get forwarded to Aurora.

### Name
Much like solar winds, star wind originates from the star(community), and triggers aurora.
