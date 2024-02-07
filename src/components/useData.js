import { useState,useEffect} from 'react';
import { users } from '../api';

export const useData = () => {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    const data = localStorage.getItem('data');
    if(!data) {
      localStorage.setItem('data', JSON.stringify(users));
    }
    setData(users);
  }

  const keys = ['NoKK', 'NIK', 'Nama'];

  const search = (data) => {
    return data.filter((item) =>
      keys.some((key) => item[key].toLowerCase().includes(query))
    );
  };

  const handleSearch = () => {
    if (!query) {
      return users;
    }
    setData(search(users));
  };

  const handleReset = () => {
    setData(users);
    setQuery('');
  };

  return {
    data,
    handleSearch,
    query,
    setQuery,
    handleReset
  }

}