"use client";
import animationData from "./card_animation.json";
import Lottie from "lottie-react";
import { Button, Stack, Typography, useMediaQuery } from "@mui/material";
import { mobile } from "@/constants/constants";
import { useSearchParams } from "next/navigation";
import { Airdropping } from "../Airdropping/Airdropping";
import { getGitHubAccessToken, redirectToGithub } from "@/app/api/github.api";
import { useEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { signIn, getSession } from "next-auth/react";

export const Home: React.FC = () => {
  const isMobile = useMediaQuery(mobile);
  const router = useRouter();
  
  useEffect(() => {
    getSession().then(r => {
      console.log(r)
    })
  })

  const params = useSearchParams();

  const [code, setCode] = useState(
    params?.get("code") ? params?.get("code") : null
  );

  useEffect(() => {
    async function fetchAccessToken() {
      if (code) {
        const res = await getGitHubAccessToken(code);

        if (res.access_token) {
          router.push("/verifying-profile?access_token=" + res.access_token);
        }
      }
    }
    fetchAccessToken();
  }, [code]);

  return (
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
          We’re giving $YOU to Developers{" "}
        </Typography>
        <Typography
          variant="bodyMedium"
          textAlign="center"
          maxWidth="90vw"
          width={600}
        >
          Connect your github and prove that you are a software developer.
        </Typography>
        <Typography
          variant="bodyMedium"
          textAlign="center"
          maxWidth="90vw"
          width={600}
        >
          Get $100 worth of $YOU.
        </Typography>
        <Typography
          variant="bodyMedium"
          textAlign="center"
          maxWidth="90vw"
          width={600}
        >
          You will have to: Own a YOU ID account Own a Github with xxx{" "}
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
            //redirectToGithub();
            signIn("github");
          }}
        >
          Connect Your Github
        </Button>
      </Stack>
      <Lottie loop animationData={animationData} style={{ width: "50vw" }} />
    </Stack>
  );
};
