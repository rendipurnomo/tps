import Table from './Table';
import { useData } from './useData';
import Spinner from './Spinner';

const Data = () => {
  const { data, handleSearch, query, setQuery, handleReset, isLoading } = useData();


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
      {isLoading ? <Spinner /> : null}
        <Table data={data} />
      </div>
  )

}

export default Data