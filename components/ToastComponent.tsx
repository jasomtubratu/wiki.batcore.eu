"use client";
import { Slide, ToastContainer } from "react-toastify";
import { useTheme } from "next-themes";

export default function ToastComponent() {
  const { theme } = useTheme();

  return (
    <ToastContainer
      closeOnClick
      draggable
      pauseOnFocusLoss
      pauseOnHover
      autoClose={5000}
      draggablePercent={60}
      hideProgressBar={false}
      limit={5}
      newestOnTop={false}
      position="top-right"
      rtl={false}
      theme={theme === "dark" ? "dark" : "light"}
      transition={Slide}
    />
  );
}