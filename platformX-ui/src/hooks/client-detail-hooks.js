import { useState, useEffect } from "react";
import { getClientById } from "../services/client-service";
import { clientMockData } from "../mocks/client_mock";

const useClientDetail = (id) => {
  const [clientDetail, setClientData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClientDetail = async () => {
      setLoading(true);
      try {
        const client = await getClientById(id);
        // const client = clientMockData.data.find(client => client.id === id);
        if (client) {
          setClientData(client);
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchClientDetail();
    }
  }, [id]);

  return { clientDetail, loading, error };
};

export default useClientDetail;
