import React, { useEffect, useState } from "react";
import classes from "./service-list.module.css";
import { ServiceListType } from "../page";
import ServiceCard from "./service-card";

export interface IServiceCard {
  serviceId: number;
  serviceType: string;
  bookingDate: string;
  description: string;
  isActive: boolean;
  isCancelled: boolean;
  customerFeedback: string;
  customerStarRating: number;
  builderFeedback: string;

  customerId: number;
  customerName: string;
  customerEmail: string;
  customerPhnNo: string;
  address: string;
  landmark: string;

  builderId: number;
  builderName: string;
  builderEmail: string;
  builderPhnNo: string;
  fee: number;
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
  console.log(servicesList);
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
