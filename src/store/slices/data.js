import { createSlice } from '@reduxjs/toolkit';

export const dataSlice = createSlice({
  name: 'data',
  initialState: {
    currentRoom: null,
    currentUser: null,
    selectedContact: null,
    contacts: null
  },
  reducers: {
    setRoom: (state, action) => {
      state.currentRoom = action.payload;
    },
    removeRoom: (state) => {
      state.currentRoom = null;
    },
    setUser: (state, action) => {
      state.currentUser = action.payload;
    },
    setContacts: (state, action) => {
      state.contacts = action.payload;
    },
    setSelectedContact: (state, action) => {
      state.selectedContact = action.payload;
    }
  }
});

export const { setRoom, removeRoom, setUser, setContacts, setSelectedContact } = dataSlice.actions;

export default dataSlice.reducer;