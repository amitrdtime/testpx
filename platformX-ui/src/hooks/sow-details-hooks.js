import { useState, useEffect } from "react";
import { getSowByNo } from "../services/client-service";

const useSowDetails = (clientId,sowNo) => {
  const [sowDetail, setSowDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSowDetails = async () => {
      setLoading(true);
      try {
        const data = await getSowByNo(clientId,sowNo);
        setSowDetail(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    if (sowNo) {
      fetchSowDetails();
    }
  }, [sowNo]);

  return { sowDetail, loading, error };
};

export default useSowDetails;
