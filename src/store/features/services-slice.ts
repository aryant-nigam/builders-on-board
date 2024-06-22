"use client";
import { createSlice } from "@reduxjs/toolkit";
import { stat } from "fs";

interface IServiceSlice {
  isUpdated: boolean;
  inactiveServicesList: any[];
  activeServicesList: any[];
  completedServicesList: any[];
  cancelledServicesList: any[];
}

const initialState: IServiceSlice = {
  isUpdated: true,
  inactiveServicesList: [],
  activeServicesList: [],
  completedServicesList: [],
  cancelledServicesList: [],
};

const servicesSlice = createSlice({
  name: "services",
  initialState: initialState,
  reducers: {
    initialiseServices: (state, action) => {
      state.activeServicesList = [];
      state.completedServicesList = [];
      state.cancelledServicesList = [];
      action.payload.servicesList.forEach((service: any) => {
        if (service.isCancelled) state.cancelledServicesList.push(service);
        else if (service.isActive === null)
          state.inactiveServicesList.push(service);
        else {
          if (service.isActive) state.activeServicesList.push(service);
          else if (service.isActive == false)
            state.completedServicesList.push(service);
        }
      });
    },

    acceptService: (state, action) => {
      state.activeServicesList.push(action.payload.service);
      state.inactiveServicesList = state.inactiveServicesList.filter(
        (service) => service.serviceId != action.payload.service.serviceId
      );
      state.activeServicesList.sort(
        (serviceA, serviceB) => serviceB.timestamp - serviceA.timestamp
      );
    },

    completeService: (state, action) => {
      state.completedServicesList.push(action.payload.service);
      state.activeServicesList = state.activeServicesList.filter(
        (service) => service.serviceId != action.payload.service.serviceId
      );

      state.completedServicesList.sort(
        (serviceA, serviceB) => serviceB.timestamp - serviceA.timestamp
      );
    },

    cancelService: (state, action) => {
      state.cancelledServicesList.push(action.payload.service);
      state.activeServicesList = state.activeServicesList.filter(
        (service) => service.serviceId != action.payload.service.serviceId
      );
      state.inactiveServicesList = state.inactiveServicesList.filter(
        (service) => service.serviceId != action.payload.service.serviceId
      );
      state.cancelledServicesList.sort(
        (serviceA, serviceB) => serviceB.timestamp - serviceA.timestamp
      );
    },

    updateCompletedServices: (state, action) => {
      console.log("updation req recieved");
      console.log(action.payload.service);
      const index = state.completedServicesList.findIndex(
        (completedService) =>
          completedService.serviceId == action.payload.service.serviceId
      );
      state.completedServicesList[index] = action.payload.service;
    },

    setIsServiceUpdated: (state) => {
      console.log("setting is service updated");
      state.isUpdated = true;
    },

    resetIsServiceUpdated: (state) => {
      console.log("called resetIsServiceUpdated");
      state.isUpdated = false;
    },

    resetServices: (state) => {
      state.activeServicesList = [];
      state.inactiveServicesList = [];
      state.completedServicesList = [];
      state.cancelledServicesList = [];
    },
  },
});

export const {
  initialiseServices,
  acceptService,
  completeService,
  cancelService,
  updateCompletedServices,
  setIsServiceUpdated,
  resetIsServiceUpdated,
  resetServices,
} = servicesSlice.actions;
export default servicesSlice.reducer;
