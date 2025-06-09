## Star wind

Star wind is the layer between Starcommunity webhooks and Aurora, it translates webhooks to actions in Aurora. It fulfills partly the same goal as [Hubble-Order-Manager](https://github.com/gewis/hubble-order-manager), but it extensible for all the webhooks. 

#### Incoming webhooks 
In `src/webhooks.ts` all the webhooks are specified, from [the starcommunity API](https://docs.starcommunity.app/docs/webhooks/intro). Each webhooks triggers a certain amount of actions in Aurora. For example, a `FoodOrderCompletedWebhook` will trigger an `addOrder` action in Aurora.

#### Outoing aurora actions
In `src/aurora.ts` all the actions are defined that you can take in Aurora. 

### Relation to [Hubble Order Manager](https://github.com/Hubble-Community-Cafe/Hubble-Order-Manager)
This project is super simple stateless service that translates webhooks to Aurora actions. Hubble Order Manager also does that specifically for orders, but also does more, such as adding orders outside of starcommunity, and display orders to users, and storing orders for a short time. This does mean that the orders propegate via both this service and Hubble Order manager, but Aurora can handle this, and it allows for one of these services to break, and the orders will still be forwarded to Aurora. 


### Name
Much like solar winds, star wind originates from the star(community), and triggers aurora. 