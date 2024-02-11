import { useState,useEffect} from 'react';
import axios from 'axios';

export const useData = () => {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get('https://datasheet.vercel.app/users');
      setData(res.data);
      setIsLoading(false);
    }catch (error) {
      console.log(error);
    }
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

    setData(search(data));
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
    isLoading
  }

}