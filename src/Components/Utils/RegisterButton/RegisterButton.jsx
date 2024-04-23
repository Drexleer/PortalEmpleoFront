import { useState } from 'react';
import { Link } from 'react-router-dom';

const RegisterButton = () => {
  const [showMenu, setShowMenu] = useState(false);

  const handleMenuClick = () => {
    setShowMenu(false);
  };

  return (
    <div className="absolute top-0 right-0">
      <div className="relative">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={() => setShowMenu(!showMenu)}
        >
          Registrarse
        </button>
        {showMenu && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg">
            <div className="py-1">
              <Link
                to="/registro/empresa"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                onClick={handleMenuClick}
              >
                Empresa
              </Link>
              <Link
                to="/registro/usuario"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                onClick={handleMenuClick}
              >
                Usuario
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegisterButton;
