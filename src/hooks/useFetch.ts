import axios, { AxiosRequestConfig } from "axios"
import { useEffect, useState, useCallback } from "react"

interface Props<T> {
  data: T | null;
  isLoading: boolean;
  error: boolean;
}

const useFetch = <T>(options: AxiosRequestConfig): Props<T> => {
  const [data, setData] = useState<T | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)

  const fetchData = useCallback(() => {
    setIsLoading(true);
    axios(options).then((response) => { setData(response.data.data) })
      .catch((error) => { console.error(error)
        setError(true) })
      .finally(() => { setIsLoading(false) })
  }, [options])

  useEffect(() => {
    fetchData();
  }, [fetchData])

  return { data, isLoading, error }
}

export default useFetch