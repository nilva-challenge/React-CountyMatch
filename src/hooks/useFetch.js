import axios from 'axios';
import { useEffect, useState } from 'react';

export const useFetch = (url, reset) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const [isFeching, setIsFeching] = useState(false);

  useEffect(() => {
    const cancelToken = axios.CancelToken.source();

    const fetchData = async () => {
      setIsFeching(true);
      try {
        const { data } = await axios.get(url, {
          cancelToken: cancelToken.token,
        });
        // find 10 random countries
        const randomData = data.sort((a, b) => 0.5 - Math.random()).slice(-10);
        const customObj = async () => {
          let filteredObj = [];
          randomData.forEach(async (el) => {
            const newOne = await axios.get(el.url);

            filteredObj.push({
              name: newOne.data.names.name,
              neighbors: [...newOne.data.neighbors.map((el) => el.name)],
            });

            if (filteredObj.length === 10) {
              // set state with desired data
              setData(filteredObj);
              setIsFeching(false);
            }
          });
        };
        customObj();
      } catch (err) {
        if (cancelToken.isCancel(err)) return;
        setIsFeching(false);
        setError('Can not Fetch Data!');
      }
    };
    fetchData();
    return () => {
      cancelToken.cancel();
    };
  }, [url, reset]);

  return { data, error, isFeching };
};
