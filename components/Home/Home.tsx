"use client";
import animationData from "./card_animation.json";
import Lottie from "lottie-react";
import {
  Button,
  CircularProgress,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { mobile } from "@/constants/constants";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, getSession, signOut } from "next-auth/react";

export const Home: React.FC = () => {
  const isMobile = useMediaQuery(mobile);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getSession().then((session) => {
      if (session?.user) {
        const shouldLink = localStorage.getItem("link");
        if (shouldLink === "YOUID") {
          localStorage.removeItem("link");
          if (session.user.commitment) {
            return router.push("/claim");
          }
          window.location.href = `${
            process.env.NEXT_PUBLIC_YOUID_URL
          }/link?reputationId=${process.env.NEXT_PUBLIC_REPUTATION_ID}&pwd=${
            (session.user as any).id
          }&callbackUrl=${window.location.origin}/link`;
          return;
        } else {
          signOut({ redirect: false }).then((res) => {
            router.replace(process.env.NEXT_PUBLIC_YOUID_URL ?? "/");
          });
        }
      }
    });
  }, []);

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
          2000 $YOU for Developers
        </Typography>
        <Typography
          variant="bodyMedium"
          textAlign="center"
          maxWidth="90vw"
          width={600}
        >
          Connect your Github and validate your developer credentials.
        </Typography>
        <Typography
          variant="bodyMedium"
          textAlign="center"
          maxWidth="90vw"
          width={600}
        >
          Click here to view all available credentials.
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
            setIsLoading(true);
            signIn("github");
          }}
          disabled={isLoading}
        >
          {isLoading ? (
            <CircularProgress size={20} color="inherit" />
          ) : (
            "Connect Github"
          )}
        </Button>
      </Stack>
      <Lottie loop animationData={animationData} style={{ width: "50vw" }} />
    </Stack>
  );
};
