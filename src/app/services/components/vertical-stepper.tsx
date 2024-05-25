"use client";
import React, { MouseEvent } from "react";
import { useState } from "react";
import classes from "./vertical-stepper.module.css";

interface IStep {
  stepNo: number;
  activeStep: number;
  label: string;
  description: string;
  isLastStep: boolean;
  hasSaved: boolean;
  onNextHandler: (event: MouseEvent) => void;
  onBackHandler: (event: MouseEvent) => void;
}

const Step = ({
  stepNo,
  activeStep,
  label,
  description,
  isLastStep,
  hasSaved,
  onNextHandler,
  onBackHandler,
}: IStep) => {
  return (
    <div className={classes["step"]}>
      <div className={classes["header"]}>
        <span
          className={`${classes["step-number"]} ${
            activeStep >= stepNo
              ? classes["active-step-number"]
              : classes["inactive-step-number"]
          }`}
        >
          {stepNo}
        </span>
        <h4
          className={`${
            activeStep > stepNo
              ? classes["active-label"]
              : classes["inactive-label"]
          }`}
        >
          {label}
        </h4>
      </div>
      <div
        className={`${classes["content"]} ${
          activeStep > stepNo
            ? classes["active-border"]
            : classes["inactive-border"]
        }`}
      >
        <p className={classes["description"]}>{description}</p>
        {activeStep == stepNo && (
          <div className={classes["footer"]}>
            {!isLastStep && (
              <button
                className={classes["next-btn"]}
                onClick={onNextHandler}
                disabled={!hasSaved}
              >
                Next
              </button>
            )}

            {stepNo != 1 && (
              <button className={classes["back-btn"]} onClick={onBackHandler}>
                Back
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

interface IVerticalStepper {
  totalSteps: number;
  steps: any[];
  activeStep: number;
  handleNext: () => void;
  handleBack: () => void;
  hasSaved: boolean;
  shouldRenderSubmissionStep: boolean;
  submitHandler: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function VerticalStepper({
  totalSteps,
  steps,
  activeStep,
  handleNext,
  handleBack,
  hasSaved,
  shouldRenderSubmissionStep,
  submitHandler,
}: IVerticalStepper) {
  //   const [activeStep, setActiveStep] = useState<number>(1);

  return (
    <div className={classes["vertical-stepper"]}>
      {steps.map((step, index) => (
        <Step
          key={index}
          stepNo={index + 1}
          activeStep={activeStep}
          label={step.label}
          description={step.description}
          isLastStep={index + 1 == totalSteps}
          hasSaved={hasSaved}
          onNextHandler={handleNext}
          onBackHandler={handleBack}
        ></Step>
      ))}
      {shouldRenderSubmissionStep && activeStep === totalSteps && (
        <div className={classes["last-step-container"]}>
          <button className={classes["submit-btn"]} onClick={submitHandler}>
            Submit
          </button>
          <button className={classes["back-btn"]} onClick={handleBack}>
            Back
          </button>
        </div>
      )}
      ;
    </div>
  );
}

// a
