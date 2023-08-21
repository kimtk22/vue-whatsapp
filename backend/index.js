import express from "express";
import cors from "cors";
import { OAuth2Client } from "google-auth-library";
import bodyParser from "body-parser";

const app = express();
const client = new OAuth2Client(
  "607162455873-k0u19f6ushglpkp9l0vt2t8hgg20856a.apps.googleusercontent.com"
);

app.use(cors());
app.use(bodyParser.json());

app.post("/api/google-login", async (req, res) => {
  const result = await client.verifyIdToken({
    idToken: req.body.token,
  });

  res.status(200).json(result.getPayload());
});

app.listen(4001, () => {
  console.log(`Server is ready at http://localhost:${4001}`);
});
