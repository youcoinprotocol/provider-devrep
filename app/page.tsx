"use client";

import React from "react";
import { ThemeProvider } from "@mui/material";
import { useAppSelector } from "@/redux/hooks";
import { Home } from "@/components/Home/Home";
import { Header } from "@/components/Header/Header";
import { theme } from "@/constants/theme";

export default function Page() {
  const user = useAppSelector((state) => state.user.user);

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Home />
    </ThemeProvider>
  );
}
