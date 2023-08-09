"use client";
import { Button, Stack, Typography, useMediaQuery } from "@mui/material";
import { mobile } from "@/constants/constants";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Header } from "@/components/Header/Header";
import { useRouter } from "next/navigation";
import { callInternalAPI } from "@/helpers/api";

const LinkPage: React.FC = () => {
  const isMobile = useMediaQuery(mobile);
  const params = useSearchParams();
  const commitment = params?.get("commitment");
  const nullifierHash = params?.get("nullifierHash");
  const pwd = params?.get("pwd");
  const proofs = params?.get("proofs");
  const router = useRouter();
  const [message, setMessage] = useState("Linking...");

  const processLinking = async () => {
    //TODO: Compare against localstorage
    if (pwd !== "123456") {
      setMessage(
        "Unable to verify your ID, redirecting to home page in 5 seconds..."
      );
      setTimeout(() => {
        router.push("/");
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
        setMessage("Link success! Redirecting to home page in 5 seconds...");
        setTimeout(() => {
          router.push("/");
        }, 5000);
      } else {
        throw new Error();
      }
    } catch (e) {
      setMessage(
        "Unable to verify your ID, redirecting to home page in 5 seconds..."
      );
      setTimeout(() => {
        router.push("/");
      }, 5000);
    }
  };

  useEffect(() => {
    if (!commitment || !nullifierHash || !pwd || !proofs) {
      router.replace("/");
    }
    processLinking();
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
  );
};

export default LinkPage;