import React, { useEffect, useState } from "react";
import classes from "./service-list.module.css";
import { ServiceListType } from "../page";
import ServiceCard from "./service-card";
import useHttp from "@/hooks/use-http";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { isExpired } from "react-jwt";
import { removeAuthenticatedUserDetails } from "@/store/features/auth-slice";
import Loader from "@/components/loader";

export interface IServiceCard {
  serviceId: string;
  serviceType: string;
  bookingDate: string;
  description: string;
  address: string;
  fee: number;
  isActive: boolean;
  builderName: string;
  builderPhnNo: string;
  builderEmail: string;
}

// const serviceList: IServiceCard[] = [
//   {
//     serviceId: "Adc45fvge4",
//     bookingDate: "25-May-2025",
//     service: "Painting",
//     charges: 300,
//     expertName: "Abhay Srivastava",
//     description: "This is the dummy description",
//     isActive: true,
//   },
//   {
//     serviceId: "Adc45fvge4",
//     bookingDate: "25-May-2025",
//     service: "Painting",
//     charges: 400,
//     expertName: "Abhay Srivastava",
//     description: "This is the dummy description",
//     isActive: true,
//   },
//   {
//     serviceId: "Adc45fvge4",
//     bookingDate: "25-May-2025",
//     service: "Painting",
//     charges: 300,
//     expertName: "Abhay Srivastava",
//     description: "This is the dummy description",
//     isActive: true,
//   },
//   {
//     serviceId: "Adc45fvge4",
//     bookingDate: "25-May-2025",
//     service: "Painting",
//     charges: 400,
//     expertName: "Abhay Srivastava",
//     description: "This is the dummy description",
//     isActive: true,
//   },
//   {
//     serviceId: "Adc45fvge4",
//     bookingDate: "25-May-2025",
//     service: "Painting",
//     charges: 500,
//     expertName: "Abhay Srivastava",
//     description: "This is the dummy description",
//     isActive: false,
//   },
//   {
//     serviceId: "Adc45fvge4",
//     bookingDate: "25-May-2025",
//     service: "Painting",
//     charges: 200,
//     expertName: "Abhay Srivastava",
//     description: "This is the dummy description",
//     isActive: false,
//   },
//   {
//     serviceId: "Adc45fvge4",
//     bookingDate: "25-May-2025",
//     service: "Painting",
//     charges: 500,
//     expertName: "Abhay Srivastava",
//     description: "This is the dummy description",
//     isActive: true,
//   },
//   {
//     serviceId: "Adc45fvge4",
//     bookingDate: "25-May-2025",
//     service: "Painting",
//     charges: 300,
//     expertName: "Abhay Srivastava",
//     description: "This is the dummy description",
//     isActive: false,
//   },
//   {
//     serviceId: "Adc45fvge4",
//     bookingDate: "25-May-2025",
//     service: "Painting",
//     charges: 400,
//     expertName: "Abhay Srivastava",
//     description: "This is the dummy description",
//     isActive: true,
//   },
//   {
//     serviceId: "Adc45fvge4",
//     bookingDate: "25-May-2025",
//     service: "Painting",
//     charges: 400,
//     expertName: "Abhay Srivastava",
//     description: "This is the dummy description",
//     isActive: false,
//   },
// ];

function ServiceList({
  type,
  servicesList,
}: {
  type: ServiceListType;
  servicesList: IServiceCard[];
}) {
  return (
    <div className={classes["service-list"]}>
      {servicesList.length !== 0 &&
        servicesList.map((service) => {
          return (
            <ServiceCard
              key={service.serviceId}
              service={service}
              type={type}
            />
          );
        })}
    </div>
  );
}

export default ServiceList;
