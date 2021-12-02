import mongoose from "mongoose";
import bcrypt from "bcrypt";

import DevDatabase from "../database/DevDatabase.js";
const db = new DevDatabase();

async function getUser(gitUser) {
  const user = await db.getUser(gitUser);

  if (!user || !mongoose.isValidObjectId(user._id))
    throw "Usuário não foi encontrado no sistema.";

  return user;
}

export default class DevService {
  async createDev(req) {
    if (req.name === "" || req.user_name === "")
      throw "Por favor, preencha o nome de usuário!";
    if (req.password === "") throw "Por favor, preencha a senha.";

    const users_name = await db.getUsersName();

    if (users_name.includes(req.user_name))
      throw "Usuário já cadastrado no sistema.";

    const resp = await db.createDev(req);
    return resp;
  }

  async login(gitUser, password) {
    if (gitUser === "") throw "Por favor, preencha o nome de usuário!";
    if (password === "") throw "Por favor, preencha a senha.";

    const user = await getUser(gitUser);

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) throw "Usuário ou senha incorreto.";

    return user;
  }
}
