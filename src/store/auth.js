import { createSlice } from '@reduxjs/toolkit'


const initialState = {
  user: JSON.parse(localStorage.getItem("user")) ?? null,
  token: JSON.parse(localStorage.getItem("token")) ?? null,
}



export const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      localStorage.setItem('user', JSON.stringify(action.payload.user))
      localStorage.setItem('token', JSON.stringify(action.payload.token))
      
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout: state => {
      localStorage.removeItem('user')
      localStorage.removeItem('token')
    
      state.user = null;
      state.token = null;
    }
  }
});

export const { login, logout } = auth.actions
export default auth.reducer