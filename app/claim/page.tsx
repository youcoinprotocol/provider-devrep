"use client";

import React from "react";
import { ThemeProvider } from "@mui/material";
import Web3 from "web3";
import { Web3ReactProvider } from "@web3-react/core";
import { theme } from "@/constants/theme";
import { ClaimPage } from "@/components/ClaimPage/ClaimPage";

const getLibrary = (provider: any) => new Web3(provider);

const Claim: React.FC = () => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <ThemeProvider theme={theme}>
        <ClaimPage />
      </ThemeProvider>
    </Web3ReactProvider>
  );
};

export default Claim;
