import DevDatabase from "../database/DevDatabase.js";
const db = new DevDatabase();

export default class DevService {
  async createDev(req) {
    if (req.name === "" || req.user_name === "")
      throw "Por favor, preencha o nome de usuário!";
    if (req.password === "") throw "Por favor, preencha a senha.";

    const users_name = await db.getUsersName();

    if (users_name.includes(req.user_name)) throw "Usuário já cadastrado no sistema."

    const resp = await db.createDev(req);
    return resp;
  }

  async login(gitUser, password) {
    if (gitUser === "") throw "Por favor, preencha o nome de usuário!";
    if (password === "") throw "Por favor, preencha a senha.";

    const resp = await db.login(gitUser, password);
    return resp;
  }
}
