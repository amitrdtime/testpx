import { useState, useEffect } from "react";
import { getSows } from "../services/client-service";

const useSow = (clientNo ,params, reload) => {
  const [sowList, setSows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSowList = async () => {
      setLoading(true);
      try {
        const data = await getSows(clientNo, params);
        console.log('----------getSow Data-----------');
        console.log(data);
        setSows(data);
        setLoading(false);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSowList();
  }, [params, reload]);

  return { sowList, loading, error };
};

export default useSow;
