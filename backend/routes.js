import cors from "cors";

import DevController from "./src/controller/DevController.js";

function serverConfig(express, server) {
  server.use(cors());
  server.use(express.json());
}

export default function Routes(express, server) {
  serverConfig(express, server);

  server.use("/dev", DevController);
}
