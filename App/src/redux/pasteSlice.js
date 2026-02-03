import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { jsx } from "react/jsx-runtime";

const initialState = {
  pastes: localStorage.getItem("pastes")
    ? JSON.parse(localStorage.getItem("pastes"))
    : [],
};

export const pasteSlice = createSlice({
  name: "paste",
  initialState,
  reducers: {
    addToPastes: (state, action) => {
      const paste = action.payload;
      //add a check if already same title exist
      state.pastes.push(paste);
      localStorage.setItem("pastes", JSON.stringify(state.pastes));
      toast("Paste Created Succesfully");
    },
    updateToPastes: (state, action) => {
      const paste = action.payload;
      console.log("Updating paste with _id:", paste._id);
  console.log("Available pastes:", state.pastes);
      const index = state.pastes.findIndex((item) =>
    (item._id) === (paste._id));

    if(index >= 0) {
      state.pastes[index] = paste;

      localStorage.setItem("pastes", JSON.stringify(state.pastes));

      toast.success("Paste Updated");
    }
    },
    resetAllPastes: (state, action) => {
      state.pastes = [];

      localStorage.removeItem("pastes");
    },
    removeFromPaste: (state, action) => {
      const pasteId = action.payload;
      console.log(pasteId);
      const index = state.pastes.findIndex((item) =>
      (item._id) === (pasteId));

      if(index >= 0) {
        state.pastes.splice(index, 1);

        localStorage.setItem("pastes", JSON.stringify(state.pastes));

        toast.success("Paste Deleted")
      }

    },
  },
});

// Action creators are generated for each case reducer function
export const { addToPastes, updateToPastes, resetAllPastes, removeFromPaste } =
  pasteSlice.actions;

export default pasteSlice.reducer;
