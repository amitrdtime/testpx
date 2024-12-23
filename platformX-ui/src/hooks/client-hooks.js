import { useState, useEffect } from "react";
import { clientMockData } from "../mocks/client_mock";
import { getClients } from "../services/client-service";
 
const useClients = (params, reload) => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 
  useEffect(() => {
    const fetchClients = async () => {
      //setLoading(true);
      try {
         const data = await getClients(params);
        setClients(data);
        setLoading(false);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
 
    fetchClients();
  }, [params, reload]);
 
  return { clients, loading, error };
};
 
export default useClients;