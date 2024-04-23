import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [Tipo, setTipo] = useState('0');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios({
      method: 'post',
      url: `http://localhost:48799/iniciarSesion`,
      data: {
        Correo: email,
        Contraseña: password,
        Tipo: Tipo,
      },
    })
      .then((response) => {
        console.log(response.data);
        if (response.data.success === true) {
          navigate('/Home');
        } else {
          alert('Usuario o contraseña incorrectos');
        }
      })
      .catch((error) => {
        console.log(error);
        // Handle login error
      });
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-1/3"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <select
          value={Tipo}
          onChange={(e) => setTipo(e.target.value)}
          className="mb-4"
        >
          <option value="0">Empresa</option>
          <option value="1">Usuario</option>
        </select>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
