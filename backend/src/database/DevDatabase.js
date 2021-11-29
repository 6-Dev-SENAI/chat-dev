import Dev from "../models/DevModel.js";

export default class DevDatabase {
  async createDev(req) {
    const resp = await Dev.create(req);
    return resp;
  }

  async login(gitUser, password) {
    const resp = await Dev.findOne({
      user_name: gitUser,
      password,
    });
    return resp;
  }

  async getUsersName() {
    const resp = await Dev.find({}, '-_id user_name');
    return resp.map(dev => dev.user_name);
  }
}
