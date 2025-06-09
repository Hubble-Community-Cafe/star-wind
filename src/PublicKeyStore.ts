export default class PublicKeyStore {
    // Currently cached public key
    private _publicKey: string = '';
    // Timestamp of the last time the public key was fetched
    private _publicKeyLastFetched: number = 0;

    private publicKeySourceUrl: string;

    constructor(publicKeySourceUrl: string) {
        this.publicKeySourceUrl = publicKeySourceUrl;
    }

    async getPublicKey(): Promise<string> {
        // If the public key is empty or has not been fetched in the last 24 hours, fetch it again
        if (!this._publicKey || Date.now() - this._publicKeyLastFetched > 60 * 60 * 1000) {
            // Fetch the public key from the source URL
            const publicKey = await fetch(this.publicKeySourceUrl)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Failed to fetch public key: ${response.statusText}`);
                    }
                    return response.text();
                })
                .catch(error => {
                    console.error(`Error fetching public key: ${error.message}`);
                    throw new Error('Failed to fetch public key');
                })

            this._publicKey = publicKey;
            this._publicKeyLastFetched = Date.now();
        }

        return this._publicKey;
    }

}