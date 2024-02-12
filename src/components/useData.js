import { useState,useEffect} from 'react';
import axios from 'axios';
import useSWR from 'swr';

export const useData = () => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get('https://datasheet.vercel.app/users');
      return res.data
    }catch (error) {
      console.log(error);
    }
  }

  const { data } = useSWR('users', fetchData);
  if(!data) {
    return <h1>Loading...</h1>
  }

  const keys = ['NoKK', 'NIK', 'Nama'];

  const search = (data) => {
    if (!query) {
      return data;
    }
    // Filter data based on query
    return data.filter((item) => keys.some((key) => item[key].toLowerCase().includes(query.toLowerCase())));
  };

  const handleSearch = () => {
    if (!query) {
      return data;
    }

    search(data);
  };

  const handleReset = () => {
    setQuery('');
    fetchData();
  };

  return {
    data,
    handleSearch,
    query,
    setQuery,
    handleReset,
    fetchData
  }

}