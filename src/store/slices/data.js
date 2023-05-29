import { createSlice } from '@reduxjs/toolkit';

export const dataSlice = createSlice({
  name: 'data',
  initialState: {
    currentRoom: null,
    currentUser: null,
    selectedContact: null,
    contacts: null,
    messages: null,
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
    },
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
  }
});

export const { setRoom, removeRoom, setUser, setContacts, setSelectedContact, setMessages } = dataSlice.actions;

export default dataSlice.reducer;