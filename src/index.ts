import "reflect-metadata";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as morgan from "morgan";
import * as cors from "cors";
import * as path from "path";
import "dotenv/config";
import { getRepository } from "typeorm";

import { getFromContainer, MetadataStorage } from "class-validator";
import { routingControllersToSpec } from "routing-controllers-openapi";
import { validationMetadatasToSchemas } from "class-validator-jsonschema";
import * as cookieParser from "cookie-parser";
import {
    useExpressServer,
    Action,
    getMetadataArgsStorage,
    RoutingControllersOptions,
  } from "routing-controllers";

import {User} from "./entity/User.entity";
import * as swaggerUi from "swagger-ui-express";
import { connect } from "./db";
const jwt = require('jsonwebtoken');
const { SITE_URL } = process.env;



const app = express();

var myLogger = function (req, res, next) {
  console.log('LOGGED')
  if(req.headers.referer !== SITE_URL) {
    return res.status(401).send("not allow");
  
  }
  next()
}

app.use(myLogger)

app.use("/", express.static(path.join(__dirname, "../public")));


const {
    PORT = 7096,
   } = process.env;
  
  app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(morgan("dev"));
app.use(cookieParser());
app.use(cors());
app.options("*", cors());

// app.use(cors({
//   origin: 'http://example.com'
// }))

const routingControllersOptions: RoutingControllersOptions = {
    validation: true,
    classTransformer: true,
    routePrefix: "/api",
    controllers: [path.join(__dirname, "/controller/*.ts")],
    authorizationChecker: async (action: Action, roles: string[]) => {
      const LoginResult = getRepository(User);
      const { authorization } = action.request.headers;
      let userId 
      jwt.verify(authorization, 'mysecretjwtkey', function(err, decoded) {
        userId = decoded?.id
      });
         
      if(userId){
        const loginDetail = await LoginResult.findOne({
            where: { id: userId, token: authorization },
          });
          // eslint-disable-next-line no-console
          console.log('loginDetail', loginDetail)
          if (loginDetail) {
            return true;
          }
        }
      return false;
    },

    defaultErrorHandler: true,
  };
  useExpressServer(app, routingControllersOptions);
  app.use((err, req, res, next) => {
    // eslint-disable-next-line no-console
    console.error("[Error]: ", err);
  });
  
  // Parse class-validator classes into JSON Schema:
  const metadatas = (getFromContainer(MetadataStorage) as any).validationMetadatas;
  const schemas = validationMetadatasToSchemas(metadatas);
  // Parse routing-controllers classes into OpenAPI spec:
  const storage = getMetadataArgsStorage();
  const spec = routingControllersToSpec(storage, routingControllersOptions, {
    components: {
      schemas,
    },
    info: {
      title: "BCU API",
      version: "0.1.0",
    },
    securitySchemes: {
      api_key: {
        type: "apiKey",
        name: "api_key",
        in: "header",
      },
    },
  });
  
  app.get("/docs/schema.json", (req, res) => res.json(spec));
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(spec));

const run = async () => {
    await connect();
    app.listen(PORT, () =>
      // eslint-disable-next-line no-console
      console.info(`Server started, listening to PORT: ${PORT}`)
    );
  };
  run();

