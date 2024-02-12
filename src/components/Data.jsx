import Table from './Table';
import { useData } from './useData';
import Spinner from './Spinner';
import { useState } from 'react';
import { useEffect } from 'react';

const Data = () => {
  const { data, query, setQuery, isLoading } = useData();
  const [datas, setDatas] = useState(data);

  const handleSearch = () => {
    const filteredData = data.filter((item) =>{
      return Object.values(item).some((value) => {
        return value.toString().toLowerCase().includes(query.toLowerCase());
      });
    });
    setQuery('');
    setDatas(filteredData);
  }

  const handleReset = () => {
    setQuery('');
    setDatas(data);
  }

  useEffect(() => {
    setDatas(data);
  }, [data]);

  return (
    <div>
      <div className="sticky top-0 left-0 flex gap-2 justify-center items-center h-[15vh] bg-cyan-500">
        <input
          type="search"
          className="border-2 border-gray-500 rounded-full px-2 py-2"
          value={query}
          placeholder="Cari"
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          type="submit"
          className="border-2 bg-green-500 rounded-full px-4 py-2 text-white font-bold"
          onClick={handleSearch}>
          Cari
        </button>
        <button
          onClick={handleReset}
          className="border-2 bg-red-500 rounded-full px-4 py-2 text-white font-bold">
          Reset
        </button>
      </div>
      <h2 className='font-bold bg-yellow-700 text-white'>Total Data: {data?.length}</h2>
      {isLoading ? <Spinner /> : (
        <Table data={datas} />
      )}
      </div>
  )

}

export default Data