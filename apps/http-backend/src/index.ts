import jwt from "jsonwebtoken";
import express from "express";
import { signUpSchema } from "./zodtypes.js";
import { signInSchema } from "./zodtypes.js";
import { prismaClient } from "@websocket-chat-app/db/client";
import bcrypt from "bcrypt";
import middleware from "./middleware.js";
import { AuthInterface } from "./middleware.js";
import cors from "cors";

//  TODO : add multer to signup point to add photo
// 2. make the signin point
// 4. save messages

const app = express();
app.use(cors());
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
          name: signUpBody.data.name,
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

app.post("/signin", async (req, res) => {
  const signInBody = signInSchema.safeParse(req.body);

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
        const jwttoken = jwt.sign(
          { userEmail: user.email, userId: user.id, name: user.name },
          "arnavsecret",
        );
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

app.post("/search", middleware, async (req, res) => {
  const username = req.query.username;
  if (typeof username !== "string") {
    return res.status(400).json({});
  }
  try {
    const results = await prismaClient.user.findMany({
      select: {
        email: true,
        name: true,
      },
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

app.post("/add-friend", middleware, async (req: AuthInterface, res) => {
  const requesterId = req.body.requesterId;
  const addressId = req.body.addressId;

  if (!requesterId || !addressId) {
    return res
      .status(402)
      .json({ message: "both reqId and addId are required" });
  }

  if (requesterId == addressId) {
    return res.status(402).json({ message: "already friends " });
  }

  try {
    const friend = await prismaClient.friendShip.create({
      data: {
        requesterId: requesterId,
        addresseId: addressId,
        status: "PENDING",
      },
    });
    res.json(friend);
  } catch (error) {
    res.json({ message: "internal server error" });
  }
});

app.post("/accept-friend-req", async (req: AuthInterface, res) => {
  const requesterId = req.body.requesterId;
  const addresseId = req.body.addresseId;

  if (!requesterId || !addresseId) {
    return res.status(402).json("both id required");
  }
  try {
    const accepted = await prismaClient.friendShip.update({
      where: {
        requesterId_addresseId: {
          requesterId,
          addresseId,
        },
      },
      data: {
        status: "ACCEPTED",
      },
    });
  } catch (err) {
    res.json({ message: "internal server error" });
  }
});

app.get("/messages", async (req: AuthInterface, res) => {
  const { id } = req.query;

  if (id) {
  }
});
app.listen(3000);
