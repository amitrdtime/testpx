import { useState, useEffect } from "react";
import { getProjectById } from "../services/client-service";
import { clientMockData } from "../mocks/client_mock";

const useProjectDetail = (clientId,sowId,projectId) => {
  console.log("clientId:",clientId)
  const [projectDetail, setProjectData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjectDetail = async (clientId,sowId,projectId) => {
      //setLoading(true);
      try {
        const project = await getProjectById(clientId,sowId,projectId);
        // const client = clientMockData.data.find(client => client.id === id);
        if (project) {
         setProjectData(project);
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    if (clientId && sowId && projectId) {
      fetchProjectDetail(clientId,sowId,projectId);
    }
  }, [clientId,sowId,projectId]);

  return { projectDetail, loading, error };
};

export default useProjectDetail;
