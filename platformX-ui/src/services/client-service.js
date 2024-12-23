import axios from "axios";
import { BaseConfig } from "../baseConfig";

const clientAPI = axios.create({
  baseURL: BaseConfig.clientApiEndPoint,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getClients = async (params) => {
  try {
    const response = await clientAPI.get("/clients", {
      params,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching clients data:", error);
    throw error;
  }
};

export const getSows = async (clientNo, params) => {
  try {
    const response = await clientAPI.get(`/client/${clientNo}/sows`, {
      params,
    });
    console.log(response.json)
    return response.data;
  } catch (error) {
    console.error("Error fetching clients data:", error);
    throw error;
  }
};

export const addClients = async (clientDetails) => {
  try {
    const response = await clientAPI.post("/clients", clientDetails);
    return response.data;
  } catch (error) {
    console.error("Error while adding new clients:", error);
    throw error;
  }
};

export const updateClient = async (id, clientDetails, etag) => {
  //const cleanedEtag = etag.replace(/\\/g, "");
  try {
    const response = await clientAPI.patch(`/clients/${id}`, clientDetails, {
      headers: {
        "If-Match": etag,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error while updating client with id ${id}:`, error);
    throw error;
  }
};

export const getTypes = async () => {
  try {
    const response = await clientAPI.get("/clients/metadata/type");
    return response.data;
  } catch (error) {
    console.error("Error fetching types:", error);
    throw error;
  }
};

export const getResources = async () => {
  try {
    const response = await clientAPI.get("/resources");
    return response.data;
  } catch (error) {
    console.error("Error fetching resources:", error);
    throw error;
  }
};

export const getMetaDataZipCode = async (countryCode) => {
  try {
    const response = await clientAPI.get(`/clients/metadata/country/${countryCode}/zipcodes`);
    return response.data;
  } catch (error) {
    console.error("Error fetching Zipcodes:", error);
    throw error;
  }
};

export const getMetaDataLanguageCode = async () => {
  try {
    const response = await clientAPI.get(`/clients/metadata/languages`);
    return response.data;
  } catch (error) {
    console.error("Error fetching Language Code:", error);
    throw error;
  }
};

export const getMetaDataFormatRegion = async () => {
  try {
    const response = await clientAPI.get(`/clients/metadata/format-regions`);
    return response.data;
  } catch (error) {
    console.error("Error fetching FormatRegion:", error);
    throw error;
  }
};

export const getMetaDataContactDetails = async () => {
  try {
    const response = await clientAPI.get(`/clients/metadata/contacts`);
    return response.data;
  } catch (error) {
    console.error("Error fetching ContactDetails:", error);
    throw error;
  }
};


export const getMetaDataCountry = async () => {
  try {
    const response = await clientAPI.get("/clients/metadata/country-regions");
    return response.data;
  } catch (error) {
    console.error("Error fetching Country:", error);
    throw error;
  }
};

export const getClientById = async (clientId) => {
  try {
    const response = await clientAPI.get(`/clients/${clientId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching client details:", error);
    throw error;
  }
};

export const getSowByNo = async (clientId,sowNo) => {
  try {
    const response = await clientAPI.get(`/client/${clientId}/sow/${sowNo}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching sow details:", error);
    throw error;
  }
};

export const addSow = async (clientNo, sowDetails) => {
  try {
    const response = await clientAPI.post(
      `/client/${clientNo}/sow`,
      sowDetails
    );
    return response.data;
  } catch (error) {
    console.error("Error while adding new sow:", error);
    throw error;
  }
};

export const getMetaDataResources = async () => {
  try {
    const response = await clientAPI.get(`/clients/metadata/resources`);
    return response.data;
  } catch (error) {
    console.error("Error fetching Resources, Person Responsibles:", error);
    throw error;
  }
};
export const getMetaDataJobType = async (type) => {
  try {
    const response = await clientAPI.get(`/clients/metadata/lookuptype/${type}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching Resources, Person Responsibles:", error);
    throw error;
  }
};

export const getMetaDataProjectPosting = async () => {
  try {
    const response = await clientAPI.get(`/clients/metadata/project-posting-group`);
    return response.data;
  } catch (error) {
    console.error("Error fetching Project Posting", error);
    throw error;
  }
};

export const getMetaDataLocations = async () => {
  try {
    const response = await clientAPI.get(`/clients/metadata/locations`);
    return response.data;
  } catch (error) {
    console.error("Error fetching locations", error);
    throw error;
  }
};

export const getMetaDataCurrencies = async () => {
  try {
    const response = await clientAPI.get(`/clients/metadata/currencies`);
    return response.data;
  } catch (error) {
    console.error("Error fetching Currencies", error);
    throw error;
  }
};

export const addProject = async (clientNo,sowId, sowDetails) => {
  try {
    const response = await clientAPI.post(
      `/client/${clientNo}/sow/${sowId}/project`,
      sowDetails
    );
    return response.data;
  } catch (error) {
    console.error("Error while adding new sow:", error);
    throw error;
  }
};

export const getMetaDataWipMethod = async () => {
  try {
    const response = await clientAPI.get(`/clients/metadata/wip`);
    return response.data;
  } catch (error) {
    console.error("Error fetching Project Posting", error);
    throw error;
  }
};

export const getProjects = async (clientNo,sowId, params) => {
  try {
    const response = await clientAPI.get(`/client/${clientNo}/sow/${sowId}/projects`, {
      params,
    });
    console.log(response.json)
    return response.data;
  } catch (error) {
    console.error("Error fetching clients data:", error);
    throw error;
  }
};

export const updateSow = async (clientNo, sowId,sowDetails) => {
  try {
    const response = await clientAPI.patch(
      `/client/${clientNo}/sow/${sowId}`,
      sowDetails
    );
    return response.data;
  } catch (error) {
    console.error("Error while adding new sow:", error);
    throw error;
  }
};

export const getProjectById = async (clientNo,sowId,projectId, params) => {
  try {
    const response = await clientAPI.get(`/client/${clientNo}/sow/${sowId}/project/${projectId}`, {
      params,
    });
    console.log(response.json)
    return response.data;
  } catch (error) {
    console.error("Error fetching clients data:", error);
    throw error;
  }
};

export const updateProject = async (clientNo,sowId,projectId, projectDetails) => {
  try {
    const response = await clientAPI.patch(
      `/client/${clientNo}/sow/${sowId}/project/${projectId}`,
      projectDetails
    );
    return response.data;
  } catch (error) {
    console.error("Error while adding new sow:", error);
    throw error;
  }
};

