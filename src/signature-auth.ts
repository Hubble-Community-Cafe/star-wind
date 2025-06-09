import { createVerify } from "crypto";
import { Request, Response, NextFunction } from 'express';
import { publicKeyStore } from "."; 

export default async function (req: Request, res: Response, next: NextFunction) {
    // check if signature is valid
    const signature = req.headers['x-signature'] as string;
    if (!signature) {
        res.status(401).send('Unauthorized: No signature provided');
        return;
    }

    let publicKey: string;
   
    try {
        publicKey = await publicKeyStore.getPublicKey()
    } catch (error) {
        console.error('Error fetching public key:', error);
        res.status(500).send('Internal Server Error: Unable to verify signature');
        return;
    }

    const verifier = createVerify("RSA-SHA256");
    verifier.update(req.body);
    verifier.end();

    // Decode the Base64 signature
    const decodedSignature = Buffer.from(signature, "base64");

    // Verify the signature
    const isValid = verifier.verify(publicKey, decodedSignature);

    if (isValid) {
        next();
    } else {
        res.status(401).send('Unauthorized: Invalid signature');
        return;
    }    
}