import axios from "axios";
import logger from "../logging/logger.js";

async function getDynamicTokenvalue() {
  const dynamicUrl = "https://innovertimesheet.azurewebsites.net";
  const targetFunctionUrl = `${dynamicUrl}/api/getBusinessCentralAccessToken`;
  try {
    logger.logger.info("Fetching access token from d365");
    const response = await axios.post(targetFunctionUrl);
    logger.logger.info("Fetching access token from d365 success!!");
    return response.data;
  } catch (error) {
    logger.logger.error(`Error fetching token: ${error}`);
    return "";
  }
}

export default {
  getDynamicTokenvalue,
};
