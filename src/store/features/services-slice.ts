"use client";
import { createSlice } from "@reduxjs/toolkit";

interface IServiceSlice {
  activeServicesList: any[];
  completedServicesList: any[];
  cancelledServicesList: any[];
}

const initialState: IServiceSlice = {
  activeServicesList: [],
  completedServicesList: [],
  cancelledServicesList: [],
};

const servicesSlice = createSlice({
  name: "services",
  initialState: initialState,
  reducers: {
    initialiseServices: (state, action) => {
      console.log(
        "request recieved to initialise services",
        action.payload.servicesList
      );
      action.payload.servicesList.forEach((service: any) => {
        if (service.isCancelled) state.cancelledServicesList.push(service);
        else {
          if (service.isActive) state.activeServicesList.push(service);
          else if (!service.isActive) state.completedServicesList.push(service);
        }
      });
    },
    completeService: (state, action) => {
      state.completedServicesList.push(action.payload.service);
      state.activeServicesList = state.activeServicesList.filter(
        (service) => service.serviceId != action.payload.service.serviceId
      );
    },
    cancelService: (state, action) => {
      state.cancelledServicesList.push(action.payload.service);
      state.activeServicesList = state.activeServicesList.filter(
        (service) => service.serviceId != action.payload.service.serviceId
      );
    },
  },
});
export const { initialiseServices, completeService, cancelService } =
  servicesSlice.actions;
export default servicesSlice.reducer;
