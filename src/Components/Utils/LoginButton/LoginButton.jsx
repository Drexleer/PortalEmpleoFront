import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutUser } from '../../Redux/Slices/LoginSlice';
import { useDispatch } from 'react-redux';

export default function LoginButton() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.usersLogin.user);

  const handleClose = () => {
    dispatch(logoutUser());
    localStorage.removeItem('user');
  };

  return (
    <div>
      {!user ? (
        <Link
          to="/login"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Iniciar Sesión
        </Link>
      ) : (
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={handleClose}
        >
          Cerrar Sesión
        </button>
      )}
    </div>
  );
}
