import express from "express";
import { signUpSchema } from "./zodtypes.js";
import { prismaClient } from "@websocket-chat-app/db/client";

const app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {
  const result = signUpSchema.safeParse(req.body);

  if (result.success) {
    // const jwt = resu;
    res.status(200).json("valid data");
  } else {
    res.status(304).json("invalid data");
  }
});

app.listen(3000);
