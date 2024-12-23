import { useState, useEffect } from "react";
import { getProjects } from "../services/client-service";
import { projectMockData } from "../mocks/client_mock";

const useProjectList = (clientNo ,sowNo, params, reload) => {
  const [sowList, setSowList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjectList = async () => {
      setLoading(true);
      try {
        const data = await getProjects(clientNo,sowNo,params);
        console.log('----------getProject Data-----------');
        setSowList(data);
        setLoading(false);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjectList();
  }, [params, reload]);

  return { sowList, loading, error };
};

export default useProjectList;