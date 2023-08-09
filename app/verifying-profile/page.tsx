"use client";
import { Stack, ThemeProvider, Typography, useMediaQuery } from "@mui/material";
import { mobile } from "@/constants/constants";
import animationData from "../../public/assets/loading.json";
import Lottie from "lottie-react";
import { Header } from "@/components/Header/Header";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getGithubEventByUsername, getGithubUser } from "../api/github.api";
import { theme } from "../page";

const VerifyingProfile: React.FC = () => {
  const isMobile = useMediaQuery(mobile);

  const params = useSearchParams();

  const [accessToken, setAccessToken] = useState(
    params?.get("access_token") ? params?.get("access_token") : null
  );

  useEffect(() => {
    async function fetchUserData() {
      if (accessToken) {
        const res = await getGithubUser(accessToken);

        if (res.login) {
          const eventRes = await getGithubEventByUsername(
            accessToken,
            res.login
          );

          if (eventRes.length > 0) {
            const contributions = eventRes.data.filter((event: any) => {
              // Customize the condition to filter relevant events (e.g., PushEvent, PullRequestEvent)
              return (
                event.type === "PushEvent" || event.type === "PullRequestEvent"
              );
            });

            console.log("Contributions:", contributions);
          }
        }
      }
    }
    fetchUserData();
  }, [accessToken]);

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
          Verifying your profile
        </Typography>
        <Lottie
          loop
          animationData={animationData}
          style={{ width: "100px", height: "100px" }}
        />
      </Stack>
    </ThemeProvider>
  );
};

export default VerifyingProfile;
