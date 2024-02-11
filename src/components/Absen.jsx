import React from 'react';
import { useEffect } from 'react';
import { useData } from './useData';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Spinner from './Spinner';

const Absen = () => {
  const { data, isLoading } = useData();
  const navigate = useNavigate()

  const absensi = data.filter((item) => item.absen === 'TRUE');
  const belumHadir = data.filter((item) => item.absen === 'FALSE');
  const meninggal = data.filter((item) => item.Keterangan === 'MENINGGAL');
  const perempuan = data.filter((item) => item.JenisKelamin === 'P' && item.absen === 'TRUE');
  const lakiLaki = data.filter((item) => item.JenisKelamin === 'L' && item.absen === 'TRUE');

  const handleRevisi = async (No) => {
    try {
      confirm('Apakah anda yakin ingin mengembalikan absen?');
      await axios.patch(`https://datasheet.vercel.app/users/${No}`, {
        absen: 'FALSE',
      });
      toast.success('Revisi Berhasil');
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  const topScreen = () => {
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    topScreen();
  }, [absensi, belumHadir, meninggal]);

  return (
    <section className="min-h-screen">
      <div className="bg-white border-b">
        <h1 className="text-3xl text-center font-bold">ABSEN</h1>
        <div>
          <p>Total Hadir: {absensi ? absensi.length : 0}</p>
          <p>Total Tidak Hadir: {belumHadir ? belumHadir.length : 0}</p>
          <p>Total Meninggal: {meninggal ? meninggal.length : 0}</p>
          <p>Total Perempuan Yang Hadir: {perempuan ? perempuan.length : 0}</p>
          <p>Total Laki-Laki Yang Hadir: {lakiLaki ? lakiLaki.length : 0}</p>
        </div>
      </div>
      {isLoading ? (
        <Spinner />
      ) : (
        <table className="w-full table-auto border-collapse border border-slate-400 text-center">
          <thead>
            <tr>
              <th>No</th>
              <th className="text-left">Nama</th>
              <th>No. KK</th>
              <th>Revisi</th>
            </tr>
          </thead>
          <tbody>
            {data
              ? data.map((item, index) =>
                  item.absen === 'TRUE' ? (
                    <tr key={index}>
                      <td>{item.No}</td>
                      <td className="capitalize text-left">{item.Nama}</td>
                      <td>{item.NoKK.slice(7, 20)}</td>
                      <td>
                        <button
                          onClick={() => handleRevisi(item.No)}
                          className="border-2 bg-red-500 rounded-full px-4 py-2 text-white font-bold">
                          revisi
                        </button>
                      </td>
                    </tr>
                  ) : null
                )
              : null}
          </tbody>
        </table>
      )}
    </section>
  );
};

export default Absen;
