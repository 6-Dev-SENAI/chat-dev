import { Router } from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import Error from "../models/res/ErrorResponse.js";
import GitHubAccess from "../utils/gitHubAccess.js";
import DevUtils from "../utils/DevUtils.js";
import DevService from "../service/DevService.js";

const route = Router();
const git = new GitHubAccess();
const cnv = new DevUtils();
const srv = new DevService();
dotenv.config();

route.post("/create", async (req, res) => {
  try {
    const devReq = req.body || { user_name: "", password: "" };

    const gitUser = await git.getUser(devReq.user_name);

    const devTable = await cnv.ToTable(
      gitUser.name,
      gitUser.user_name,
      devReq.password
    );

    const dev = await srv.createDev(devTable);

    if (!dev || !mongoose.isValidObjectId(dev._id)) {
      return res
        .status(500)
        .send(new Error(500, "Ocorreu um erro ao tentar criar o usuário..."));
    }

    const token = jwt.sign({ dev_password: dev.password }, process.env.TOKEN);

    const devResp = cnv.ToResponse(dev);

    const resp = {
      token,
      dev: devResp,
    };

    return res.status(200).send(resp);
  } catch (error) {
    return res.status(400).send(new Error(400, error));
  }
});

export default route;
