"use client";
import animationData from "@/components/Home/card_animation.json";
import Lottie from "lottie-react";
import {
  Button,
  Stack,
  ThemeProvider,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { mobile } from "@/constants/constants";
import { useRouter } from "next/navigation";
import { theme } from "@/app/page";
import { Header } from "@/components/Header/Header";

const Uneligible: React.FC = () => {
  const isMobile = useMediaQuery(mobile);
  const router = useRouter();

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Stack
        direction={isMobile ? "column" : "row"}
        sx={{
          width: "100vw",
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Stack
          direction="column"
          gap={3}
          alignItems="center"
          pl={isMobile ? 0 : 6}
          pr={isMobile ? 0 : 6}
        >
          <Typography
            variant="headlineLarge"
            mt={isMobile ? 6 : 0}
            textAlign={"center"}
          >
            Opps, you are not eligible for the claim
          </Typography>
          <Typography
            variant="bodyMedium"
            textAlign="center"
            maxWidth="90vw"
            width={600}
          >
            Your profile does not currently meet the requirements. Please check
            back later to claim.
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
            onClick={() => {
              router.push("/");
            }}
          >
            Back to Home
          </Button>
        </Stack>
        <Lottie loop animationData={animationData} style={{ width: "50vw" }} />
      </Stack>
    </ThemeProvider>
  );
};

export default Uneligible;
