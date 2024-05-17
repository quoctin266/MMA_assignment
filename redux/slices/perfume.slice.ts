import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IPerfume } from "@/types/data.dt";

interface IState {
  favoriteList: IPerfume[];
}

const initialState: IState = {
  favoriteList: [],
};

export const perfumeSlice = createSlice({
  name: "perfumes",
  initialState,
  reducers: {
    addItem: (state, { payload }: PayloadAction<IPerfume>) => {
      state.favoriteList.push(payload);
    },
    removeItem: (state, { payload }: PayloadAction<IPerfume>) => {
      state.favoriteList = state.favoriteList.filter(
        (item) => item.id !== payload.id
      );
    },
  },
});

export const { addItem, removeItem } = perfumeSlice.actions;

export default perfumeSlice.reducer;
