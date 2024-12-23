import { useState, useEffect } from "react";
import { getUserById } from "../services/user-service";
import keysToCamelCase from "../utils/wrapper";

const useFetchUserById = (email, reload) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await getUserById(email);
        setData(keysToCamelCase(result.data));
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [email, reload]);

  return { data, loading, error };
};

export default useFetchUserById;
