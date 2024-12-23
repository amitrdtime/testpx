import { useState, useEffect } from "react";
import { getSowByNo } from "../services/client-service";
import { roleMockData } from "../mocks/client_mock";

const useRoleDetails = (params, reload) => {
  const [rolewDetail, setRoleDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRoleDetails = async () => {
      setLoading(true);
      try {
        const data = roleMockData.data;
        setRoleDetail(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchRoleDetails();
  }, [params, reload]);

  return { rolewDetail, loading, error };
};

export default useRoleDetails;
