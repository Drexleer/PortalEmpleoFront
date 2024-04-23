import { useSelector } from 'react-redux';
import RegisterButton from '../../Components/Utils/RegisterButton/RegisterButton';
import { useEffect } from 'react';
import { loginUser } from '../../Components/Redux/Slices/LoginSlice';
import { useDispatch } from 'react-redux';
import LoginButton from '../../Components/Utils/LoginButton/LoginButton';

export default function Home() {
  const user = useSelector((state) => state.usersLogin.user);

  const dispatch = useDispatch();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      dispatch(loginUser(JSON.parse(storedUser)));
    }
  }, [dispatch]);

  console.log(user);

  return (
    <div>
      <h1>Home</h1>
      <div>{!user && <RegisterButton />}</div>
      <div>
        <LoginButton />
      </div>
    </div>
  );
}
