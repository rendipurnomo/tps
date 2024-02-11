import { useNavigate } from 'react-router-dom';
import copy from '../assets/copy-svgrepo-com.svg';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { useState } from 'react';

const Table = ({ data }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const copyText = (KK) => {
    const textElement = document.createElement('textarea');
    textElement.value = KK;

    document.body.appendChild(textElement);
    textElement.select();
    document.execCommand('copy');
    document.body.removeChild(textElement);

    // Tambahkan toast
    toast('No KK berhasil disalin', {
      icon: '📋',
    });
  };

  const handleAbsen = async (No) => {
    confirm('Apakah anda yakin ingin menandai absen?');
    try {
      setIsLoading(true);
      await axios.patch(`http://localhost:5000/users/${No}`, {
        absen: 'TRUE',
      });
      toast.success('Absen Berhasil');
      setIsLoading(false);
      navigate('/absen');
    } catch (error) {
      toast.error('Absen Gagal');
      console.log(error);
    }
  };

  return (
    <div className="p-2 space-y-4">
      {data ? (
        data.map((item, index) =>
            <div key={index} className="flex gap-2 p-2 bg-gray-300 rounded-md">
              <p className="font-bold w-1/4 border-r border-gray-500">
                No: {item.No}
              </p>
              <div className="flex flex-col gap-2">
                <p className="font-bold">{item.Nama}</p>
                <div className="flex gap-2">
                  <p>No.KK: {item.NoKK}</p>
                  <button onClick={() => copyText(item.NoKK)}>
                    <img className="ml-2 h-4 w-4" src={copy} alt="" />
                    copy
                  </button>
                </div>
                <p>NIK: {item.NIK}</p>
                {item.absen === 'FALSE' ? (
                <button
                  onClick={() => handleAbsen(item.No)}
                  className={`${
                    item.Keterangan ? 'hidden' : 'block'
                  } border-2 rounded-full px-4 py-2 text-white font-bold bg-green-500`}>
                  Absen
                </button>
                ) : null}
              </div>
            </div>
        )
      ) : (
        <div>
          <p>Tidak ada data ditemukan</p>
        </div>
      )}

      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: '',
          duration: 500,
          style: {
            background: '#ffffff',
            color: '#212121',
          },

          // Default options for specific types
          success: {
            duration: 500,
            theme: {
              primary: 'green',
              secondary: 'black',
            },
          },
        }}
      />
    </div>
  );
};

export default Table;
