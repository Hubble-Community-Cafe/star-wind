import express from "express";
import "dotenv/config";
import PublicKeyStore from "./PublicKeyStore";
import signatureAuth from "./signature-auth";
import webhooksRouter from "./webhooks";
const app = express();
const publicKeyStore = new PublicKeyStore(process.env.STARCOMMUNITY_PUBLIC_KEY_URL);
const port = 3001;

// Extract raw header for signature authentication
app.use(express.text({ type: "*/*" }));

app.use(signatureAuth)

// Parse back from JSON
app.use(function (req, res, next) {
    req.body = JSON.parse(req.body);   
    next();
});

app.get("/", (req, res) => {
  res.send("See https://github.com/hubble-community-cafe/starcommunity-to-aurora for more information");
});

app.use(webhooksRouter);

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});

export { publicKeyStore };
export default app;