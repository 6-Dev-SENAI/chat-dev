import express from "express";
import dotenv from "dotenv";

import Init from "./src/database/scripts/index.js";
import Routes from "./routes.js";

dotenv.config();
const Database = new Init();

function startServer() {
  const server = express();
  Routes(express, server);

  const port = process.env.PORT || 5001;
  server.listen(port, () => {
    console.info(`...$ API on and connected in http://localhost:${port}/`);
  });
}

function stopServer(error) {
  console.info(`...$ An error occurred while trying to start API`);
  console.error(`...$ Error => ${error}`);
  Database.disconnect().then(() => process.exit(1));
}

Database.connect().then(startServer).catch(stopServer);
