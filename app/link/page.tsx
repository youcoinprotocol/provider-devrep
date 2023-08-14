"use client";
import {
  Button,
  Stack,
  ThemeProvider,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { mobile } from "@/constants/constants";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Header } from "@/components/Header/Header";
import { useRouter } from "next/navigation";
import { callInternalAPI } from "@/helpers/api";
import { getSession, signOut } from "next-auth/react";
import { Session } from "next-auth";
import { theme } from "@/constants/theme";

const LinkPage: React.FC = () => {
  const isMobile = useMediaQuery(mobile);
  const params = useSearchParams();
  const commitment = params?.get("commitment");
  const nullifierHash = params?.get("nullifierHash");
  const pwd = params?.get("pwd");
  const proofs = params?.get("proofs");
  const router = useRouter();
  const [message, setMessage] = useState("Linking your profile with YOU ID...");

  const processLinking = async (session: Session) => {
    if (pwd !== session.user?.id.toString()) {
      setMessage(
        "Unable to verify your ID, redirecting back to home in 5 seconds..."
      );
      localStorage.clear();
      await signOut({
        redirect: false,
      });
      setTimeout(() => {
        router.replace("/");
      }, 5000);
      return;
    }

    try {
      const res = await callInternalAPI(`/api/links`, "POST", undefined, {
        proof: JSON.parse(proofs ?? ""),
        pwd,
        nullifierHash,
        commitment,
      });
      if (res.success) {
        setMessage("Linked successful!");
        setTimeout(() => {
          router.replace("/verify");
        }, 500);
      } else {
        throw new Error();
      }
    } catch (e) {
      setMessage(
        "Unable to verify your ID, redirecting back to home in 5 seconds..."
      );

      await signOut({
        redirect: false,
      });
      localStorage.clear();

      setTimeout(() => {
        return router.replace("/");
      }, 5000);
    }
  };

  useEffect(() => {
    if (!commitment || !nullifierHash || !pwd || !proofs) {
      return router.replace("/");
    }
    getSession().then((session) => {
      if (!session?.user) {
        return router.replace("/");
      }
      processLinking(session as Session);
    });
  }, []);

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
            {message}
          </Typography>
        </Stack>
      </Stack>
    </ThemeProvider>
  );
};

export default LinkPage;
