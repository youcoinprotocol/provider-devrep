"use client";

import React, { useState, useEffect } from "react";
import { Stack, Typography, useMediaQuery } from "@mui/material";
import { mobile } from "@/constants/constants";
import { Header } from "@/components/Header/Header";
import { LoadingButton } from "@mui/lab";
import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import { CustomSnackbar } from "@/components/CustomSnackbar/CustomSnackbar";
import { callInternalAPI } from "@/helpers/api";
import { useRouter } from "next/navigation";

const injected = new InjectedConnector({});

export const ClaimPage: React.FC = () => {
  const isMobile = useMediaQuery(mobile);
  const [isProcessing, setIsProcessing] = useState(false);
  const { library, activate, account, active } = useWeb3React();
  const [error, setError] = useState("");
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);
  const router = useRouter();

  const claim = async () => {
    setIsProcessing(true);
    if (!active || !account) {
      setIsProcessing(false);
      return;
    }
    try {
      const signature = await library.provider.request({
        method: "personal_sign",
        params: [`$YOU Github airdrop`, account],
      });

      const resp = await callInternalAPI(`/api/claims`, "POST", undefined, {
        sig: signature,
        address: account,
      });

      if (resp?.success) {
        router.push("/claim/success");
      }
    } catch (e) {
      console.log(e);
      setIsProcessing(false);
    }
  };

  const connectWallet = async () => {
    setIsProcessing(true);
    await activate(injected, (err) => {
      setError("Error connecting wallet.");
      setOpenErrorSnackbar(true);
    });
  };

  useEffect(() => {
    if (!active || !account) return;
    claim();
  }, [active, account]);

  return (
    <>
      <Header />
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
          Your credentials have been validated.
        </Typography>
        <Typography
          variant="bodyMedium"
          fontWeight={500}
          pl={isMobile ? 1 : 6}
          pr={isMobile ? 1 : 6}
          textAlign={"center"}
        >
          View them in your YOU ID app. Connect wallet to claim $YOU rewards
          now.{" "}
        </Typography>
        <Stack direction={"row"} gap={2}>
          <LoadingButton
            sx={{
              borderRadius: "16px",
              pl: 3,
              pr: 3,
              pt: 1.5,
              pb: 1.5,
              border: "1px solid #FF8600",
              boxShadow: "0px 0px 20px 0px rgba(0, 0, 0, 0.05)",
              color: "black",
              "&:hover": {
                opacity: 0.5,
                background: "#FF8600",
                color: "white",
              },
            }}
            onClick={account ? claim : connectWallet}
            loading={isProcessing}
          >
            Claim $YOU
          </LoadingButton>

          <LoadingButton
            sx={{
              borderRadius: "16px",
              pl: 3,
              pr: 3,
              pt: 1.5,
              pb: 1.5,
              border: "1px solid #FF8600",
              boxShadow: "0px 0px 20px 0px rgba(0, 0, 0, 0.05)",
              color: "black",
              "&:hover": {
                opacity: 0.5,
                background: "#FF8600",
                color: "white",
              },
            }}
            onClick={() => {
              return window.open(process.env.NEXT_PUBLIC_YOUCOIN_URL, "_blank");
            }}
            loading={isProcessing}
          >
            View Credentials
          </LoadingButton>
        </Stack>
      </Stack>
      <CustomSnackbar
        severity="error"
        message={error}
        open={openErrorSnackbar}
        setOpen={setOpenErrorSnackbar}
      />
    </>
  );
};
