import { useSelector } from 'react-redux';
import RegisterButton from '../../Components/Utils/RegisterButton/RegisterButton';
import { useEffect, useState } from 'react';
import { loginUser } from '../../Components/Redux/Slices/LoginSlice';
import { useDispatch } from 'react-redux';
import LoginButton from '../../Components/Utils/LoginButton/LoginButton';
import { Link } from 'react-router-dom';
import Postularse from '../../Components/Postularse/Postularse';
import axios from 'axios';

export default function Home() {
  const user = useSelector((state) => state.usersLogin.user);
  const [ofertas, setOfertas] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      dispatch(loginUser(JSON.parse(storedUser)));
    }
  }, [dispatch]);

  useEffect(() => {
    const fetchOfertas = async () => {
      try {
        const response = await axios.get('http://localhost:5010/Ofertas');
        setOfertas(response.data);
      } catch (error) {
        console.error('Error al obtener las ofertas de empleo:', error);
      }
    };
    fetchOfertas();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-center mb-8">
          Ofertas de Empleo
        </h1>
        <div className="flex justify-end mb-4">
          <LoginButton />
          {!user && <RegisterButton />}
          {!user && <RegisterButton />}
          {user && user.tipo !== 1 && (
            <Link
              to="/empleo"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-4"
            >
              Crear nuevo empleo
            </Link>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {ofertas.map((oferta) => (
            <div
              key={oferta.ofertaId}
              className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-lg font-semibold text-blue-500">
                  Oferta: {oferta.nombre}
                </h3>
                <p className="text-sm text-gray-600 mt-2">
                  Descripción: {oferta.descripcion}
                </p>
              </div>
              <div className="mt-4 flex justify-between">
                <span className="text-gray-500">
                  Salario: {oferta.salario}$
                </span>
                {user && user.tipo === 1 && (
                  <Postularse
                    ofertaId={oferta.ofertaId}
                    onClose={() => setModalIsOpen(false)}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
