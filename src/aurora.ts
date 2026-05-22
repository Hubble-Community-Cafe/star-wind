// Here all the aurora actions are defined

export interface Screen {
    id: number;
    name: string;
    scaleFactor: number;
    createdAt: string;
    updatedAt: string;
}

async function fetchAurora(endpoint: string, method: string, body?: unknown): Promise<Response> {
    const hasBody = body !== undefined && ['POST', 'PUT', 'PATCH'].includes(method);
    return fetch(`${process.env.AURORA_URL}/api/${endpoint}`, {
        method,
        headers: {
            ...(hasBody ? { 'Content-Type': 'application/json' } : {}),
            'x-api-key': process.env.AURORA_API_KEY!,
        },
        body: hasBody ? JSON.stringify(body) : undefined,
    });
}

export async function createOrder(orderNumber: number): Promise<void> {
    await fetchAurora('orders', 'POST', { orderNumber });
}

export async function getScreens(): Promise<Screen[]> {
    const response = await fetchAurora('screen', 'GET');
    return response.json();
}

export async function setScreenHandler(screenId: number, handlerName: string): Promise<void> {
    await fetchAurora(`handler/screen/${screenId}`, 'POST', { name: handlerName });
}

export async function showStaticPoster(posterId: number): Promise<void> {
    await fetchAurora(`handler/screen/poster/static/items/${posterId}/show`, 'POST');
}

/**
 * Add more Aurora actions here as needed.
 */
