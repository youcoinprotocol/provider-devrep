"use client";
import { Stack, ThemeProvider, Typography, useMediaQuery } from "@mui/material";
import { mobile } from "@/constants/constants";
import animationData from "../../public/assets/loading.json";
import Lottie from "lottie-react";
import { Header } from "@/components/Header/Header";
import { useEffect, useState } from "react";
import { theme } from "@/constants/theme";
import { useRouter } from "next/navigation";
import { callInternalAPI } from "@/helpers/api";

const VerifyingProfile: React.FC = () => {
  const isMobile = useMediaQuery(mobile);

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(
    "Validating your developer credentials"
  );
  const router = useRouter();

  useEffect(() => {
    callInternalAPI("/api/contributions", "POST", undefined)
      .then((res) => {
        if (!res.success) {
          throw new Error("Not eligible");
        }
        router.push("/claim");
      })
      .catch((err) => {
        router.replace("/ineligible");
      });
  }, []);

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
        gap={3}
      >
        <img
          src="/assets/youXgit.png"
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
          {message}
        </Typography>
        {loading && (
          <Lottie
            loop
            animationData={animationData}
            style={{ width: "100px", height: "100px" }}
          />
        )}
      </Stack>
    </ThemeProvider>
  );
};

export default VerifyingProfile;
