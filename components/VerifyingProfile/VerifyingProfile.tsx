import { Stack, Typography, useMediaQuery } from "@mui/material";
import { mobile } from "@/constants/constants";
import animationData from "../../public/assets/loading.json";
import Lottie from "lottie-react";

export const VerifyingProfile: React.FC = () => {
  const isMobile = useMediaQuery(mobile);

  return (
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
      >
        Verifying your profile{" "}
      </Typography>
      <Lottie loop animationData={animationData} style={{ width: "50vw" }} />
    </Stack>
  );
};
