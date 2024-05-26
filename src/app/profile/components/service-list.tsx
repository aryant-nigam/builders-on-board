import React from "react";
import classes from "./service-list.module.css";
import ServiceCard from "./service-card";

export interface IServiceCard {
  serviceId: string;
  bookingDate: string;
  service: string;
  charges: number;
  expertName: string;
  description: string;
  isActive: boolean;
}

const serviceList: IServiceCard[] = [
  {
    serviceId: "Adc45fvge4",
    bookingDate: "25-May-2025",
    service: "Painting",
    charges: 300,
    expertName: "Abhay Srivastava",
    description: "This is the dummy description",
    isActive: true,
  },
  {
    serviceId: "Adc45fvge4",
    bookingDate: "25-May-2025",
    service: "Painting",
    charges: 400,
    expertName: "Abhay Srivastava",
    description: "This is the dummy description",
    isActive: true,
  },
  {
    serviceId: "Adc45fvge4",
    bookingDate: "25-May-2025",
    service: "Painting",
    charges: 300,
    expertName: "Abhay Srivastava",
    description: "This is the dummy description",
    isActive: true,
  },
  {
    serviceId: "Adc45fvge4",
    bookingDate: "25-May-2025",
    service: "Painting",
    charges: 400,
    expertName: "Abhay Srivastava",
    description: "This is the dummy description",
    isActive: true,
  },
  {
    serviceId: "Adc45fvge4",
    bookingDate: "25-May-2025",
    service: "Painting",
    charges: 500,
    expertName: "Abhay Srivastava",
    description: "This is the dummy description",
    isActive: false,
  },
  {
    serviceId: "Adc45fvge4",
    bookingDate: "25-May-2025",
    service: "Painting",
    charges: 200,
    expertName: "Abhay Srivastava",
    description: "This is the dummy description",
    isActive: false,
  },
  {
    serviceId: "Adc45fvge4",
    bookingDate: "25-May-2025",
    service: "Painting",
    charges: 500,
    expertName: "Abhay Srivastava",
    description: "This is the dummy description",
    isActive: true,
  },
  {
    serviceId: "Adc45fvge4",
    bookingDate: "25-May-2025",
    service: "Painting",
    charges: 300,
    expertName: "Abhay Srivastava",
    description: "This is the dummy description",
    isActive: false,
  },
  {
    serviceId: "Adc45fvge4",
    bookingDate: "25-May-2025",
    service: "Painting",
    charges: 400,
    expertName: "Abhay Srivastava",
    description: "This is the dummy description",
    isActive: true,
  },
  {
    serviceId: "Adc45fvge4",
    bookingDate: "25-May-2025",
    service: "Painting",
    charges: 400,
    expertName: "Abhay Srivastava",
    description: "This is the dummy description",
    isActive: false,
  },
];

function ServiceList({ isActive }: { isActive: boolean }) {
  return (
    <div className={classes["service-list"]}>
      {serviceList
        .filter((service) => service.isActive === isActive)
        .map((service) => {
          return <ServiceCard serviceCard={service} isActive={isActive} />;
        })}
    </div>
  );
}

export default ServiceList;
