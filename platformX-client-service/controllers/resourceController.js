import clientService from '../services/resourceService.js';
import camelcaseConverter from '../helper/camelcaseConverter.js';
import logger from '../logging/logger.js';


//Get Resources
const getResources = async (req, res) => { 
    try {
      const results = await clientService.getResources();
      if (!results || results.length === 0) {
        return res.status(404).json({ error: "No resources found" });
      }
      const camelCaseResponse = camelcaseConverter.keysToCamelCase(results);
      res.json(camelCaseResponse);
    } catch (error) {
      logger.logger.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  
  export default {
  getResources
  };