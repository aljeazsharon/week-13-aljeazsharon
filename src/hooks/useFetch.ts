import axios, { AxiosRequestConfig } from "axios"
import { useEffect, useState, useCallback } from "react"

interface Props<T> {
  data: T | null;
  loading: boolean;
  error: boolean;
}

const useFetch = <T>(options: AxiosRequestConfig): Props<T> => {
  const [data, setData] = useState<T|null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)

  const fetchData = useCallback(() => {
    setLoading(true)
    axios(options)
      .then((response) => { setData(response.data.data)})
      .catch((error) => {
        console.error(error)
        setError(true)
      })
      .finally(() => { setLoading(false) })
  }, [options])

  useEffect(() => { 
    fetchData()
  }, []);

  return { data, loading, error };
};

export default useFetch;