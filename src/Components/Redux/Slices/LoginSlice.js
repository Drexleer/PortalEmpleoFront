import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const apiUrl = 'http://:localhost:5010/iniciarSesion';

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
      let user = null;

      if (data.success && data.usuario) {
        user = data.usuario;
      } else if (data.success && data.empresa) {
        user = data.empresa;
      }

      if (user) {
        dispatch(loginUser(user));
        localStorage.setItem('user', JSON.stringify(user));
        return { access: true };
      }
    } catch (error) {
      return { access: false };
    }
  };
};
