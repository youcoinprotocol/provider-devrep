"use client";

import { Stack, ThemeProvider, Typography, useMediaQuery } from "@mui/material";
import { mobile } from "@/constants/constants";
import Lottie from "lottie-react";
import animationData from "./falling-coin.json";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { callAPI } from "@/helpers/api";
import { Header } from "@/components/Header/Header";
import { theme } from "@/app/page";

type Props = {
  amount: number;
  uid?: string;
};

const ClaimSuccess: React.FC<Props> = ({ amount, uid }) => {
  const isMobile = useMediaQuery(mobile);
  const router = useRouter();

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
          position: "relative",
        }}
        gap={3}
      >
        <Lottie
          loop={false}
          animationData={animationData}
          style={{
            width: "100vw",
            position: "absolute",
            top: 0,
            left: 0,
            height: "100vh",
          }}
        />
        <img
          src="/assets/youcoin.png"
          width={48}
          height={48}
          style={{
            objectFit: "contain",
          }}
        />
        <Typography
          variant="headlineLarge"
          pl={isMobile ? 1 : 6}
          pr={isMobile ? 1 : 6}
          textAlign="center"
        >
          Claim Success!
        </Typography>
        <Typography variant="bodyMedium" textAlign="center">
          Check your wallet now!
        </Typography>
      </Stack>
    </ThemeProvider>
  );
};

export default ClaimSuccess;
