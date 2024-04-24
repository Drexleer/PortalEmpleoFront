import { useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { useSelector } from 'react-redux';

const Postularse = ({ ofertaId, onClose }) => {
  const [archivoCV, setArchivoCV] = useState(null);
  const user = useSelector((state) => state.usersLogin.user);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleFileChange = (e) => {
    setArchivoCV(e.target.files[0]);
  };

  console.log(user);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('OfertaDeEmpleoID', ofertaId);
      formData.append('UsuarioId', user.usuarioId);
      formData.append('ArchivoCV', archivoCV);

      await axios.post('http://localhost:5010/Postulaciones', formData);

      alert('¡Te has postulado exitosamente!');
      setModalIsOpen(false);
      onClose();
    } catch (error) {
      console.error('Error al postularse:', error);
      alert('Error al postularse');
    }
  };

  return (
    <>
      <button
        onClick={() => setModalIsOpen(true)}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Postularse
      </button>
      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
        <h2>Postularse a esta oferta</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="archivoCV">CV (PDF):</label>
            <input
              type="file"
              id="archivoCV"
              onChange={handleFileChange}
              required
            />
          </div>
          <div className="flex justify-between mt-4">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Postularse
            </button>
            <button
              type="button"
              onClick={() => {
                setModalIsOpen(false);
                onClose(); // Cierra la ventana modal
              }}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Cancelar
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default Postularse;
