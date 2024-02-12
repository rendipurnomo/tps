import React from 'react';
import { useData } from './useData';
import { useEffect } from 'react';
import { useState } from 'react';
import toast from 'react-hot-toast';

const Hasil = () => {
  const { data } = useData();
  const [suratSuara, setSuratSuara] = useState(0);
  const [suratRusak, setSuratRusak] = useState(0);
  const [DPTbPerempuan, setDPTbPerempuan] = useState(0);
  const [DPTbLakiLaki, setDPTbLakiLaki] = useState(0);

  const keys = ['NoKK', 'NIK', 'JenisKelamin', 'Disabilitas', 'absen'];
  const dptPengguna = data.filter((item) =>
    keys.some((key) => item[key] === 'TRUE')
  );
  const dptPerempuan = data.filter((item) =>
    keys.some((key) => item[key] === 'P')
  );
  const dptLakiLaki = data.filter((item) =>
    keys.some((key) => item[key] === 'L')
  );

  const penggunaPerempuan = dptPengguna.filter(
    (item) => item.JenisKelamin === 'P'
  );
  const penggunaLakiLaki = dptPengguna.filter(
    (item) => item.JenisKelamin === 'L'
  );

  const disabilitas = data.filter((item) =>
    keys.some((key) => item[key] === 'DISABILITAS')
  );
  const disabilitasLakiLaki = disabilitas.filter(
    (item) => item.JenisKelamin === 'L' && item.absen === 'TRUE'
  );
  const disabilitasPerempuan = disabilitas.filter(
    (item) => item.JenisKelamin === 'P' && item.absen === 'TRUE'
  );

  const topScreen = () => {
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    topScreen();

    const data = localStorage.getItem('data');

    if (data) {
      const { suratSuara, suratRusak, DPTbPerempuan, DPTbLakiLaki } =
        JSON.parse(data);
      setSuratSuara(suratSuara);
      setSuratRusak(suratRusak);
      setDPTbPerempuan(DPTbPerempuan);
      setDPTbLakiLaki(DPTbLakiLaki);
    } else {
      localStorage.setItem(
        'data',
        JSON.stringify({
          suratSuara: 0,
          suratRusak: 0,
          DPTbPerempuan: 0,
          DPTbLakiLaki: 0,
        })
      );
    }
  }, [data]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      suratSuara,
      suratRusak,
      DPTbPerempuan,
      DPTbLakiLaki,
    };
    localStorage.setItem('data', JSON.stringify(data));
    toast.success('Data tersimpan');
  };

  return (
    <div className="min-h-screen w-full text-xs py-4">
      <div className="p-4 mb-5 w-[80%] mx-auto rounded-md shadow-lg bg-gray-200">
        <form
          className="w-1/2 mx-auto flex flex-col gap-2"
          onSubmit={handleSubmit}>
          <label htmlFor="jumlahSuratSuara" className="font-bold text-red-500">
            Jumlah Surat Suara termasuk tambahan 2%
          </label>
          <input
            id="jumlahSuratSuara"
            type="number"
            placeholder="Jumlah Surat Suara Total"
            className="border-2 rounded-md p-2"
            value={suratSuara}
            onChange={(e) => setSuratSuara(e.target.value)}
          />
          <label htmlFor="jumlahSuratRusak" className="font-bold text-red-500">
            Jumlah Surat Suara yang rusak/salah coblos
          </label>
          <input
            id="jumlahSuratRusak"
            type="number"
            placeholder="Jumlah Surat Suara Rusak"
            className="border-2 rounded-md p-2"
            value={suratRusak}
            onChange={(e) => setSuratRusak(e.target.value)}
          />
          <h1 className="font-bold text-center">Pengguna DPTb</h1>
          <div className="flex gap-2">
            <div className="flex flex-col w-1/2">
              <label
                htmlFor="jumlahDptbPerempuan"
                className="font-bold text-red-500 text-center">
                perempuan
              </label>
              <input
                id="jumlahDptbPerempuan"
                type="number"
                className="border-2 rounded-md p-2"
                value={DPTbPerempuan}
                onChange={(e) => setDPTbPerempuan(e.target.value)}
              />
            </div>
            <div className="flex flex-col w-1/2">
              <label
                htmlFor="jumlahDptbLakiLaki"
                className="font-bold text-red-500 text-center">
                laki-laki
              </label>
              <input
                id="jumlahDptbLakiLaki"
                type="number"
                className="border-2 rounded-md p-2"
                value={DPTbLakiLaki}
                onChange={(e) => setDPTbLakiLaki(e.target.value)}
              />
            </div>
          </div>
          <button
            className="border-2 bg-green-500 rounded-full px-4 py-2 text-white font-bold"
            type="submit">
            Simpan
          </button>
        </form>
      </div>
      <h1 className="text-center font-bold px-10 mb-5">
        BERITA ACARA,SERTIFIKAT DAN CATATAN HASIL PERHITUNGAN PEROLEHAN SUARA DI
        TEMPAT PEMUNGUTAN SUARA DALAM PEMILIHAN UMUM TAHUN 2024
      </h1>
      <p className="text-justify px-4 mb-5">
        Pada hari ini <strong>RABU</strong> tanggal <strong>EMPAT BELAS</strong>{' '}
        bulan <strong>FEBRUARI</strong> tahun{' '}
        <strong>DUA RIBU DUA PULUH EMPAT</strong> kelompok penyelenggara
        pemungutan suara(KPPS) mengadakan rapat pemungutan suara dan
        penghitungan suara dalam pemilihan umum presiden dan wakil presiden
        Republik Indonesia, yang dihadiri oleh saksi dan atau panwaslu
        kelurahan/desa/pengawas TPS, bertempat di
      </p>
      <div className="border-[1px] border-gray-300 flex w-[80%] mx-auto p-2 mb-5">
        <div className="flex-1 flex flex-col gap-2">
          <p>
            Provinsi : <strong>JAWA TENGAH</strong>
          </p>
          <p>
            Kabupaten/Kota : <strong>KARANGANYAR</strong>
          </p>
        </div>
        <div className="flex-1 flex flex-col gap-2">
          <p>
            Kecamatan : <strong>JATEN</strong>
          </p>
          <p>
            Kelurahan/Desa : <strong>SROYO</strong>
          </p>
          <p>
            Nomor TPS : <strong>12(DUA BELAS)</strong>
          </p>
        </div>
      </div>

      <p className="text-justify px-4">
        Pemungutan dan penghitungan suara dipimpin oleh ketua KPPS dengan
        kegiata membuka rapat pemungutan suara,membuka kotak suara dan
        mengeluarkan seluruh isi kotak suara, mengidentifikasi dan mengitung
        jenis serta jumlah dokumen dan peralatan pemungutan suara, memeriksa dan
        menandatangani surat suara yang akan digunakan oleh pemilih, dimulai
        pukul <strong>07.00</strong> s.d <strong>13.00</strong> waktu setempat.
      </p>
      <p className="text-justify px-4 mb-8">
        Selanjutnya rapat penghitungan suara dimulai pukul{' '}
        <strong>13.45</strong> s.d <strong>16.00</strong> Waktu setempat dihari
        yang sama/setelahnya. Adapun data pemilih dan pengguna hak pilih,
        penggunaan surat suara, dan hasil penghitungan suara terinci sebagai
        berikut:
      </p>

      <div className="px-4">
        <h1 className="font-bold mb-1">
          I. DATA PEMILIH DAN PENGGUNA HAK PILIH
        </h1>

        <table className="border-[1px] border-gray-300 w-full">
          <thead>
            <tr className="uppercase">
              <th className="border-[1px] border-gray-300">uraian</th>
              <th className="border-[1px] border-gray-300">laki-laki(L)</th>
              <th className="border-[1px] border-gray-300">perempuan(P)</th>
              <th className="border-[1px] border-gray-300">jumlah (L+P)</th>
            </tr>
          </thead>
          <tbody>
            <tr className="uppercase">
              <td className="border-[1px] border-gray-300 font-bold">
                A. data pemilih
              </td>
            </tr>
            <tr>
              <td className="border-[1px] border-gray-300">
                jumlah pemilih dalam Daftar Pemilih Tetap(DPT)
                <br />
                <span className="italic">
                  (terdapat dalam Model A-Kabko Daftar pemilih)
                </span>
              </td>
              <td className="border-[1px] border-gray-300 text-lg font-bold text-center">
                {dptLakiLaki.length > 0 ? dptLakiLaki.length : 'XXX'}
              </td>
              <td className="border-[1px] border-gray-300  text-lg font-bold text-center">
                {dptPerempuan.length > 0 ? dptPerempuan.length : 'XXX'}
              </td>
              <td className="border-[1px] border-gray-300 text-lg font-bold text-center">
                {dptLakiLaki.length + dptPerempuan.length}
              </td>
            </tr>
            <tr className="uppercase">
              <td className="border-[1px] border-gray-300 font-bold">
                b. pengguna hak pilih
              </td>
            </tr>
            <tr>
              <td className="border-[1px] border-gray-300">
                1. Jumlah pengguna hak pilih dalam Daftar Pemilih Tetap(DPT)
              </td>
              <td className="border-[1px] border-gray-300 text-lg font-bold text-center">
                {penggunaLakiLaki.length > 0 ? penggunaLakiLaki.length : 'XXX'}
              </td>
              <td className="border-[1px] border-gray-300  text-lg font-bold text-center">
                {penggunaPerempuan.length > 0
                  ? penggunaPerempuan.length
                  : 'XXX'}
              </td>
              <td className="border-[1px] border-gray-300 text-lg font-bold text-center">
                {dptPengguna.length > 0 ? dptPengguna.length : 'XXX'}
              </td>
            </tr>

            <tr>
              <td className="border-[1px] border-gray-300">
                2. Jumlah pengguna hak pilih dalam Daftar Pemilih Tambahan(DPTb)
              </td>
              <td className="border-[1px] border-gray-300 text-lg font-bold text-center">
                {DPTbLakiLaki > 0 ? DPTbLakiLaki : 'XXX'}
              </td>
              <td className="border-[1px] border-gray-300  text-lg font-bold text-center">
                {DPTbPerempuan > 0 ? DPTbPerempuan : 'XXX'}
              </td>
              <td className="border-[1px] border-gray-300 text-lg font-bold text-center">
                {DPTbLakiLaki + DPTbPerempuan > 0
                  ? parseInt(DPTbLakiLaki) + parseInt(DPTbPerempuan)
                  : 'XXX'}
              </td>
            </tr>

            <tr>
              <td className="border-[1px] border-gray-300">
                3. Jumlah pengguna hak pilih dalam Daftar Pemilih Khusus(DPK)
              </td>
              <td className="border-[1px] border-gray-300 text-lg font-bold text-center">
                XXX
              </td>
              <td className="border-[1px] border-gray-300  text-lg font-bold text-center">
                XXX
              </td>
              <td className="border-[1px] border-gray-300 text-lg font-bold text-center">
                XXX
              </td>
            </tr>

            <tr>
              <td className="border-[1px] border-gray-300 font-bold">
                4. Jumlah pengguna hak pilih (B1 + B2 + B3)
              </td>
              <td className="border-[1px] border-gray-300 text-lg font-bold text-center">
                {penggunaLakiLaki.length > 0 ? penggunaLakiLaki.length : 'XXX'}
              </td>
              <td className="border-[1px] border-gray-300  text-lg font-bold text-center">
                {penggunaPerempuan.length > 0
                  ? penggunaPerempuan.length
                  : 'XXX'}
              </td>
              <td className="border-[1px] border-gray-300 text-lg font-bold text-center text-red-500">
                {dptPengguna.length > 0
                  ? parseInt(dptPengguna.length) +
                    parseInt(DPTbLakiLaki) +
                    parseInt(DPTbPerempuan)
                  : 'XXX'}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="px-4 mt-8">
        <h1 className="font-bold mb-1 uppercase">
          II. DATA penggunaan surat suara
        </h1>
        <table className="border-[1px] border-gray-300 w-full">
          <thead>
            <tr className="uppercase">
              <th className="border-[1px] border-gray-300">uraian</th>
              <th className="border-[1px] border-gray-300">jumlah</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border-[1px] border-gray-300">
                1. Jumlah surat suara yang diterima, termasuk surat suara
                cadangan 2% dari DPT
              </td>
              <td className="border-[1px] border-gray-300 text-lg font-bold text-center">
                {suratSuara > 0 ? suratSuara : 'XXX'}
              </td>
            </tr>

            <tr>
              <td className="border-[1px] border-gray-300">
                2. Jumlah surat suara yang digunakan
              </td>
              <td className="border-[1px] border-gray-300 text-lg font-bold text-center text-red-500">
                {dptPengguna.length > 0
                  ? parseInt(dptPengguna.length) +
                    parseInt(DPTbLakiLaki) +
                    parseInt(DPTbPerempuan)
                  : 'XXX'}
              </td>
            </tr>

            <tr>
              <td className="border-[1px] border-gray-300">
                3. Jumlah surat suara yang dikembalikan oleh pemilih(Karena
                rusak atau keliru coblos)
              </td>
              <td className="border-[1px] border-gray-300 text-lg font-bold text-center">
                {suratRusak > 0 ? suratRusak : 'XXX'}
              </td>
            </tr>

            <tr>
              <td className="border-[1px] border-gray-300">
                4. Jumlah surat suara yang tidak digunakan/tidak terpakai,
                termasuk surat suara cadangan
              </td>
              <td className="border-[1px] border-gray-300 text-lg font-bold text-center">
                {suratSuara - parseInt(dptPengguna.length) -parseInt(DPTbLakiLaki) -parseInt(DPTbPerempuan) - suratRusak}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="px-4 mt-8">
        <h1 className="font-bold mb-1 uppercase">
          III. DATA pemilih disabilitas
        </h1>
        <table className="border-[1px] border-gray-300 w-full">
          <thead>
            <tr className="uppercase">
              <th className="border-[1px] border-gray-300">uraian</th>
              <th className="border-[1px] border-gray-300">laki-laki(L)</th>
              <th className="border-[1px] border-gray-300">perempuan(P)</th>
              <th className="border-[1px] border-gray-300">jumlah(L+P)</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td className="border-[1px] border-gray-300">
                1. Jumlah seluruh pemilih disabilitas yang menggunakan hak pilih
              </td>
              <td className="border-[1px] border-gray-300 text-lg font-bold  text-center">
                {disabilitasLakiLaki.length > 0
                  ? disabilitasLakiLaki.length
                  : 'XXX'}
              </td>
              <td className="border-[1px] border-gray-300 text-lg font-bold  text-center">
                {disabilitasPerempuan.length > 0
                  ? disabilitasPerempuan.length
                  : 'XXX'}
              </td>
              <td className="border-[1px] border-gray-300 text-lg font-bold  text-center">
                {disabilitasLakiLaki.length + disabilitasPerempuan.length > 0
                  ? disabilitasLakiLaki.length + disabilitasPerempuan.length
                  : 'XXX'}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Hasil;
