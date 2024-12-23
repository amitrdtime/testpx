const appConfig = require("./Config.json");

let environment = appConfig.environment;
const dynamoDbPrefix = "";
let ApiEndPoint = "http://localhost:5000";
let ApiAdminEndPoint = "http://localhost:4000/admin-api";
let ApiEndForSamsara = "http://localhost:4000/external/api";
let ApiKey = "";
let userApiEndPoint = "http://localhost:5000/user-service/users";
let clientApiEndPoint = "http://localhost:5000/client-service";

switch (environment.toUpperCase()) {
  case "LOCAL":
    ApiAdminEndPoint = appConfig.local.apiUrl + "/admin-api";
    ApiKey = appConfig.local.key;
    break;
  case "DEV":
    ApiEndPoint = appConfig.dev.apiUrl + "/api";
    ApiAdminEndPoint = appConfig.dev.apiUrl + "/admin-api";
    ApiEndForSamsara = appConfig.dev.apiUrl + "/external/api";
    ApiKey = appConfig.dev.key;
    break;
  case "QA":
    break;
  case "LIVE":
    break;
  default:
}

export const BaseConfig = {
  dynamoDbPrefix,
  ApiEndPoint: ApiEndPoint,
  ApiAdminEndPoint: ApiAdminEndPoint,
  ApiEndForSamsara: ApiEndForSamsara,
  ApiKey: ApiKey,
  clientApiEndPoint,
  userApiEndPoint,
};
