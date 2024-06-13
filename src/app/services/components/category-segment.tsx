"use client";
import React, { useEffect, useState } from "react";
import classes from "./category-segment.module.css";
import BuilderCard from "./builder-card";
import useHttp from "@/hooks/use-http";
import { useAppSelector } from "@/store/hooks";
import Loader from "@/components/loader";

export interface Iworker {
  id: number;
  name: string;
  image: string;
  expertise: string;
  pincode?: string;
  experience: number;
  fee: number;
}

export interface Builder {
  builder_id: string;
  email: string;
  fee: number;
  firstname: string;
  lastname: string;
  phn_no: string;
  pincode: string;
  service_type: string;
}

function CategorySegment({
  serviceType,
  pincode,
  selectedBuilder,
  saveBuilder,
}: {
  serviceType: string;
  pincode: string;
  selectedBuilder: Builder | null;
  saveBuilder: (builder: Builder) => void;
}) {
  console.log(serviceType, pincode);
  const accessToken = useAppSelector((state) => state.auth.accessToken);

  const { get, isLoading, errorMsg } = useHttp(
    `https://builders-on-board-be-2.onrender.com/builder?service_type=${serviceType}&pincode=${pincode}`
  );

  console.log(
    `https://builders-on-board-be-2.onrender.com/builder?service_type=${serviceType}&pincode=${pincode}`
  );
  const [buildersList, setBuildersList] = useState<Builder[]>([]);
  const [builderSelected, setBuilderSelected] = useState<Builder | null>();

  useEffect(() => {
    const fetchBuilders = async () => {
      const buildersList: Builder[] = await get(accessToken);
      setBuildersList(buildersList);
      setBuilderSelected(selectedBuilder ? selectedBuilder : buildersList[0]);
      console.log(buildersList);
    };
    fetchBuilders();
  }, []);

  if (buildersList && buildersList.length !== 0) {
    !selectedBuilder && saveBuilder(builderSelected!);
  }

  const selectBuilderHandler = (builder: Builder) => {
    setBuilderSelected(builder);
    saveBuilder(builder);
  };

  if (isLoading || buildersList.length !== 0)
    return (
      <div className={classes["category-segment"]}>
        <h1>
          <span className={classes["highlighted-text"]}>
            {serviceType} Staff&nbsp;
          </span>
          in your locality
        </h1>
        {buildersList.length !== 0 && (
          <div className={classes["workers-list"]}>
            {buildersList.map((builder) => {
              return (
                <BuilderCard
                  key={builder.builder_id}
                  builder={builder}
                  selectBuilderHandler={selectBuilderHandler}
                  isSelected={
                    builder.builder_id === builderSelected!.builder_id
                  }
                ></BuilderCard>
              );
            })}
          </div>
        )}
        {isLoading && <Loader />}
      </div>
    );
  else {
    return (
      <div className={classes["category-segment"]}>
        <h1>😟 unfortunately! no experts found </h1>
      </div>
    );
  }
  // } else if (isLoading) {
  //   return <Loader />;
  // } else {
  //   return (
  //     <div className={classes["category-segment"]}>
  //       <h1>😟 unfortunately! no experts found </h1>
  //     </div>
  //   );
  // }
}

export default CategorySegment;
