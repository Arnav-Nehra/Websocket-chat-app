import jwt from "jsonwebtoken";
import express from "express";
import { signUpSchema } from "./zodtypes.js";
import { prismaClient } from "@websocket-chat-app/db/client";
import bcrypt from "bcrypt";
// TODO   :
// 1. make the signup point (add multer for photo )
// 2. make the signin point
// 3.allow to add friends
// 4. save messages

const app = express();

app.use(express.json());

const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

app.post("/signup", async (req, res) => {
  const signUpBody = signUpSchema.safeParse(req.body);

  if (signUpBody.success) {
    const hashedPassword = await hashPassword(signUpBody.data.password);

    try {
      const User = await prismaClient.user.create({
        data: {
          email: signUpBody.data.username,
          password: hashedPassword,
          name: signUpBody.data.username,
        },
      });
      res.status(200).json(User);
    } catch (e) {
      res.status(400).json("User already exists");
    }
  } else {
    res.status(400).json("invalid data");
  }
});

app.post("/sigin", async (req, res) => {
  const signInBody = signUpSchema.safeParse(req.body);

  if (signInBody.success) {
    try {
      const user = await prismaClient.user.findFirst({
        where: {
          email: signInBody.data.username,
        },
      });

      if (user) {
        const comparedPassword = await bcrypt.compare(
          signInBody.data.password,
          user.password,
        );
        if (!comparedPassword) {
          res.status(403).json({ message: "user not authorized" });
          return;
        }
        const jwttoken = jwt.sign({ UserId: user.id }, "arnavsecret");
        res.json(jwttoken);
      }
    } catch (error) {
      res.status(403).json({
        message: "user doesn't exists",
      });
    }
  } else {
    res.status(400).json({
      message: "invalid credentials",
    });
  }
});

app.get("/search", async (req, res) => {
  const { username } = req.query;

  if (typeof username !== "string") {
    return res.status(400).json({});
  }
  try {
    const results = await prismaClient.user.findMany({
      where: {
        email: {
          contains: username,
        },
      },
    });
    res.status(200).json(results);
  } catch (error) {
    res.json({});
  }
});
app.listen(3000);
