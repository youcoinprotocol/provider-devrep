"use client";
import animationData from "./card_animation.json";
import Lottie from "lottie-react";
import { Button, Stack, Typography, useMediaQuery } from "@mui/material";
import { mobile } from "@/constants/constants";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { signIn, getSession } from "next-auth/react";

export const Home: React.FC = () => {
  const isMobile = useMediaQuery(mobile);
  const router = useRouter();

  useEffect(() => {
    getSession().then((session) => {
      if (session?.user) {
        const shouldLink = localStorage.getItem("link");
        if (shouldLink === "YOUID") {
          localStorage.removeItem("link");
          window.location.href = `${process.env.NEXT_PUBLIC_YOUID_URL}/link?reputationId=${process.env.NEXT_PUBLIC_REPUTATION_ID}&pwd=${session.user.id}&callbackUrl=${window.location.origin}/link`;
        }
      }
    });
  });

  const params = useSearchParams();
  useMemo(() => {
    if (params?.get("link")) {
      localStorage.setItem("link", params?.get("link") ?? "");
      router.replace("/");
    }
  }, []);

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
          You will have to: Own a YOU ID account and a Github with at least 5
          contributions.
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
