import { useEffect, useState } from "react";
import axios from "axios";

export default function useAxiosGet(url) {
  const [state, setState] = useState({
    axiosGetResponse: [],
    isLoading: false,
    isError: false,
  });

  useEffect(() => {
    async function fetchData() {
      try {
        setState({ axiosGetResponse: [], isLoading: true, isError: false });
        await axios.get(url).then((res) => {
          setState({
            axiosGetResponse: res.data,
            loading: false,
            isError: false,
          });
        });
      } catch (error) {
        setState({ axiosGetResponse: [], isLoading: false, isError: true });
      }
    }
    fetchData();

    return () => {
      setState({ axiosGetResponse: [], loading: false, error: false });
    };
  }, [url]);

  return state;
}
