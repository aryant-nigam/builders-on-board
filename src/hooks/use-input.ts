"use client";

import { useState } from "react";

interface Iinput {}

interface Ioutput {
  value: string;
  isValid: boolean;
  hasError: boolean;
  updateValueOnKeyStroke: (event: React.FocusEvent<HTMLInputElement>) => void;
  updateIsTouched: (event: React.FocusEvent<HTMLInputElement>) => void;
  reset: () => void;
}

const useInput = ({
  validator,
}: {
  validator: (value: any) => boolean;
}): Ioutput => {
  const [value, setValue] = useState<string>("");
  const [isTouched, setIsTouched] = useState<boolean>(false);

  const isValid: boolean = validator(value);
  const hasError = !isValid && isTouched;

  const updateValueOnKeyStroke = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setValue(event.target.value);
  };

  const updateIsTouched = (event: React.FocusEvent<HTMLInputElement>) => {
    setIsTouched(true);
  };

  const reset = () => {
    setValue("");
    setIsTouched(false);
  };

  return {
    value,
    isValid,
    hasError,
    updateValueOnKeyStroke,
    updateIsTouched,
    reset,
  };
};

export default useInput;
