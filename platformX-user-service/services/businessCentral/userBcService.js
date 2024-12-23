import accessTokenService from "../accessTokenService.js";
import axios from "axios";
import xml2js from "xml2js";
import logger from "../../logging/logger.js";

async function getMetadata() {
  logger.logger.info("Getting access token from getMetadata()");
  const accessToken = await accessTokenService.getDynamicTokenvalue();
  const metadataUrl =
    "https://api.businesscentral.dynamics.com/v2.0/a494276d-ad3b-44d9-83b5-4ae7a8531c92/ProdCopy/ODataV4/$metadata";
  try {
    logger.logger.info("Calling getMetadata from d365 via api call");
    const response = await axios.get(metadataUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/xml",
      },
    });

    const parser = new xml2js.Parser();
    parser.parseString(response.data, (err, result) => {
      if (err) {
        logger.logger.error(`Error parsing XML in getMetadata(): ${err}`);
        return;
      }
      // Extract entity types
      const schema = result["edmx:Edmx"]["edmx:DataServices"][0].Schema[0];
      const entityTypes = schema.EntityType;
      // List entity names
      const entityNames = entityTypes.map((entity) => entity.$.Name);
    });
  } catch (error) {
    logger.logger.error(`Error fetching metadata: ${error}`);
  }
}

async function getResourceInfoByEmail(email) {
  logger.logger.info("Fetching access token from getResourceInfoByEmail()");
  const accessToken = await accessTokenService.getDynamicTokenvalue();
  const apiUrl = `https://api.businesscentral.dynamics.com/v2.0/a494276d-ad3b-44d9-83b5-4ae7a8531c92/ProdCopy/ODataV4/Company('InnoverDigital%20LLC')/Resource_Card_Excel`;

  // OData query options
  const queryOptions = {
    $filter: `Resource_Email_ID eq '${email}'`, // Filter by specific criteria
  };

  // Construct the query string
  const queryString = Object.entries(queryOptions)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join("&");

  const fullUrl = `${apiUrl}?${queryString}`;
  try {
    logger.logger.info("Calling getResourceInfoByEmail from d365 via api call");
    const response = await axios.get(fullUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    return response.data.value;
  } catch (error) {
    logger.logger.error(`Error querying resources: ${error}`);
  }
}

async function getResourceDetail(email) {
  logger.logger.info("Fetching access token from getResourceDetail()");
  const accessToken = await accessTokenService.getDynamicTokenvalue();
  const postData = {
    resourceEmailID: email,
  };
  const url =
    "https://api.businesscentral.dynamics.com/v2.0/a494276d-ad3b-44d9-83b5-4ae7a8531c92/ProdCopy/ODataV4/TimesheetGetReq_GetResourceDetails?company=InnoverDigital%20LLC";
  const options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };
  logger.logger.info("Calling getResourceDetail from d365 via api call");
  return axios
    .post(url, postData, options)
    .then((response) => {
      return JSON.parse(response.data.value);
    })
    .catch((error) => {
      logger.logger.error(
        `Error while fetching getResourceDetail from d365: ${error}`
      );
      return {};
    });
}

export default {
  getMetadata,
  getResourceInfoByEmail,
  getResourceDetail,
};
