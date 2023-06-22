import { createSlice } from '@reduxjs/toolkit';

export const dataSlice = createSlice({
  name: 'data',
  initialState: {
    currentRoom: null,
    currentUser: null,
    selectedContact: null,
    contacts: null,
    messages: null,
    newMessage: null,
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
    setNewMessage: (state, action) => {
      state.newMessage = action.payload;
      state.messages = [state.newMessage, ...state.messages];
    },
  }
});

export const { setRoom, removeRoom, setUser, setContacts, setSelectedContact, setMessages, setNewMessage } = dataSlice.actions;

export default dataSlice.reducer;