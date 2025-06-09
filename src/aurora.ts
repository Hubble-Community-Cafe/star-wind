// Here all the aurora actions are defined

export function createOrder(orderNumber: number) {
    fetch(`${process.env.AURORA_URL}/api/orders`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-api-key": "beep"
        },
        body: JSON.stringify({
            orderNumber: orderNumber,
        }),
     }, )
}

