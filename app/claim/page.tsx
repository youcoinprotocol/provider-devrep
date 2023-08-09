"use client";
import React from "react";
import {
  Button,
  Stack,
  ThemeProvider,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { mobile } from "@/constants/constants";
import animationData from "../../public/assets/loading.json";
import Lottie from "lottie-react";
import { Header } from "@/components/Header/Header";
import { theme } from "../page";

const Claim: React.FC = () => {
  const isMobile = useMediaQuery(mobile);

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Stack
        direction="column"
        sx={{
          width: "100vw",
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
        }}
        gap={4}
      >
        <img
          src="/assets/youcoin.png"
          width={178}
          height={60}
          style={{
            objectFit: "contain",
          }}
        />
        <Typography
          variant="headlineLarge"
          pl={isMobile ? 1 : 6}
          pr={isMobile ? 1 : 6}
          textAlign={"center"}
        >
          You are eligible to claim 100 $YOU{" "}
        </Typography>
        <Button
          sx={{
            borderRadius: "16px",
            pl: 3,
            pr: 3,
            pt: 1.5,
            pb: 1.5,
            background: "#FF8600",
            boxShadow: "0px 0px 20px 0px rgba(0, 0, 0, 0.05)",
            color: "white",
            "&:hover": {
              opacity: 0.5,
              background: "#FF8600",
              color: "white",
            },
          }}
        >
          Connect Wallet to Claim
        </Button>
      </Stack>
    </ThemeProvider>
  );
};

export default Claim;
