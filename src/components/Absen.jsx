import React from 'react';
import { useState, useEffect } from 'react';

const Absen = () => {
  const [belumHadir, setBelumHadir] = useState(null);
  const [meninggal, setMeninggal] = useState(null);
  const [absensi, setAbsensi] = useState(null);

  useEffect(() => {
    fetchAbsen();
  }, []);
  const fetchAbsen = () => {

    const absens = localStorage.getItem('data');
    const absen = JSON.parse(absens);
    if (!absen) {
      localStorage.setItem('data', JSON.stringify(absen));
    }
    setAbsensi(absen?.filter((item) => item.Keterangan === true));
    setBelumHadir(absen?.filter((item) => item.Keterangan === null));
    setMeninggal(absen?.filter((item) => item.Keterangan === 'MENINGGAL'));
  };

  return (
    <section className='min-h-screen'>
      <div className='sticky top-0 left-0 bg-white border-b'>
      <h1 className="text-3xl text-center font-bold">ABSEN</h1>
      <div>
        <p>Total Hadir: {absensi ? absensi.length : 0}</p>
        <p>Total Tidak Hadir: {belumHadir ? belumHadir.length : 0}</p>
        <p>Total Meninggal: {meninggal ? meninggal.length : 0}</p>
      </div>
      </div>
      <table className="w-full table-auto border-collapse border border-slate-400 text-center">
        <thead>
          <tr>
            <th>No</th>
            <th className="text-left">Nama</th>
            <th>No. KK</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {absensi !== null
            ? absensi.map((item, index) => (
                <tr key={index}>
                  <td>{item.No}</td>
                  <td className="capitalize text-left">{item.Nama}</td>
                  <td>{item.NoKK.slice(7, 20)}</td>
                  <td>{item.Keterangan ? 'Hadir' : 'Tidak Hadir'}</td>
                </tr>
              ))
            : null}
        </tbody>
      </table>
    </section>
  );
};

export default Absen;
