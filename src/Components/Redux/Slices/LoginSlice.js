import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const apiUrl = 'http://localhost:48799/iniciarSesion';

// Set el estado de usuario cuando hacen login o logout
export const userLoginSlice = createSlice({
  name: 'usersLogin',
  initialState: {
    user: null,
  },
  reducers: {
    loginUser: (state, action) => {
      state.user = action.payload;
    },
    logoutUser: (state) => {
      state.user = null;
    },
  },
});

export const { loginUser, logoutUser } = userLoginSlice.actions;

export default userLoginSlice.reducer;

// Hace el fetch para el login del usuario
export const fetchUserLogin = (form) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(apiUrl, form);
      localStorage.setItem('user', JSON.stringify(data.usuario));

      if (data.success) {
        dispatch(loginUser(data.usuario));
        return { access: true };
      }
    } catch (error) {
      return { access: false };
    }
  };
};
