import React from "react";
import { useToasts } from "react-toast-notifications";

const { addToast } = useToasts();

export const showErrorToast = (message: string) => {
  addToast(message, { appearance: "error" });
};
