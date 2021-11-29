import axios from "axios";

export default class GitHubAccess {
  async getUser(user_name) {
    try {
      const resp = await axios.get(`https://api.github.com/users/${user_name}`);
      const { login, name } = resp.data;

      return {
        user_name: login || user_name,
        name: name || login,
      };
    } catch (error) {
      return {
        user_name,
        name: user_name,
      };
    }
  }
}
