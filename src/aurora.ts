// Here all the aurora actions are defined

function fetchAurora(endpoint, method, body) {
    return fetch(`${process.env.AURORA_URL}/api/${endpoint}`, {
        method: method,
        headers: {
            "Content-Type": method == "POST" && "application/json",
            "x-api-key": process.env.AURORA_API_KEY
        },
        body: JSON.stringify(body),
    });
}


export function createOrder(orderNumber: number) {
    fetchAurora('orders', 'POST', {
        orderNumber: orderNumber
    })
}

/**
 * Add more Aurora actions here as needed.
 */
