import {createSlice} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const storySlice = createSlice({
  name: 'DharDena',

  initialState: {
    last_person: 0,
    last_transaction: 0,
    category: [],
    person: [],
    transaction: [],
  },

  reducers: {
    loadData: (state, action) => {
      state.last_person = parseInt(action.payload.last_person);
      state.last_transaction = parseInt(action.payload.last_transaction);
      state.category = action.payload.category;
      state.person = action.payload.person;
      state.transaction = action.payload.transaction;
    },
    loadLPI: (state, action) => {
      state.last_person = action.payload;
    },
    loadLTI: (state, action) => {
      state.last_transaction = action.payload;
    },
    loadCategory: (state, action) => {
      state.category = action.payload;
    },
    loadPerson: (state, action) => {
      state.person = action.payload;
    },
    loadTransaction: (state, action) => {
      state.transaction = action.payload;
    },
  },
});

export const {
  loadData,
  loadLPI,
  loadLTI,
  loadCategory,
  loadPerson,
  loadTransaction,
} = storySlice.actions;

export default storySlice.reducer;
