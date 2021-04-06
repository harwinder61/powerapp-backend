import "reflect-metadata";
import { createConnection } from "typeorm";
import * as path from "path";

const { DB_HOST, DB_NAME, DB_USERNAME, DB_PASSWORD } = process.env;

export const connect = () => {
  return createConnection({
    type: "mssql",
    host: "traciprod.database.windows.net",
    // port: parseInt(DB_PORT, 10),
    username: "ralph",
    password: "B!a@85P@cNE8f*R@8EL#z6k#",
    database: "dealerDevelopment",
    entities: [path.join(__dirname, "/entity/*.ts")],
    // port: 1433,
    options: {
      // encrypt: false,
      enableArithAbort: false,
    },
    logging: true,
  }).catch(error =>
    // eslint-disable-next-line no-console
    console.log("DB_HOST", error)
  );
};
