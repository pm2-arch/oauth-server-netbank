const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());

const CLIENT_ID = "onyx-client";
const CLIENT_SECRET = "secret123";
const SECRET = "jwt_secret";

// AUTHORIZE
app.get("/authorize", (req, res) => {
  const { client_id, redirect_uri } = req.query;

  if (client_id !== CLIENT_ID) {
    return res.status(400).send("Invalid client");
  }

  const code = "sample_code";

  res.redirect(`${redirect_uri}?code=${code}`);
});

// TOKEN
app.post("/token", (req, res) => {
  const { client_id, client_secret, code } = req.body;

  if (client_id !== CLIENT_ID || client_secret !== CLIENT_SECRET) {
    return res.status(401).json({ error: "Invalid client" });
  }

  if (code !== "sample_code") {
    return res.status(400).json({ error: "Invalid code" });
  }

  const token = jwt.sign({ user: "onyx-user" }, SECRET, {
    expiresIn: "1h",
  });

  res.json({
    access_token: token,
    token_type: "Bearer",
  });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
