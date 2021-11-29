import bcrypt from "bcrypt";

import Dev from "../models/res/DevResponse.js";

async function encryptPassword(password) {
  if (password === "") return "";
  const encrypted = await bcrypt.hash(password, 10);
  return encrypted;
}

export default class DevUtils {
  async ToTable(name, user_name, password) {
    const resp = {
      name,
      user_name,
      password: await encryptPassword(password),
    };
    return resp;
  }

  ToResponse(dev) {
    const { name, user_name, _id: id } = dev;

    const resp = new Dev(name, user_name, id);

    return resp;
  }
}
