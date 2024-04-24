import { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CrearEmpleo = () => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [salario, setSalario] = useState('');

  const user = useSelector((state) => state.usersLogin.user);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:48799/Ofertas', {
        nombre,
        descripcion,
        salario: parseFloat(salario),
        empresaId: user.empresaId,
      });

      console.log(response.data.message);
      window.alert('Oferta de empleo creada exitosamente');
      navigate('/');
    } catch (error) {
      console.error('Error al crear oferta de empleo:', error);
      window.alert('Error al crear oferta de empleo');
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Crear Oferta de Empleo</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="nombre" className="block">
            Nombre:
          </label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <div>
          <label htmlFor="descripcion" className="block">
            Descripción:
          </label>
          <textarea
            id="descripcion"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
          ></textarea>
        </div>
        <div>
          <label htmlFor="salario" className="block">
            Salario:
          </label>
          <input
            type="text"
            id="salario"
            value={salario}
            onChange={(e) => setSalario(e.target.value)}
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Crear Empleo
        </button>
      </form>
    </div>
  );
};

export default CrearEmpleo;
