import { createSlice } from '@reduxjs/toolkit'


const initialState = {
  users: []
}



export const usersSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    allUsers: (state, action) => {
        state.users = action.payload
    }
  }
});

export const { allUsers } = usersSlice.actions
export default usersSlice.reducer