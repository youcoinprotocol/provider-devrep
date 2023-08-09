"use client";

import React, { useState, useEffect } from "react";
import { Stack, Typography, useMediaQuery } from "@mui/material";
import { mobile } from "@/constants/constants";
import { Header } from "@/components/Header/Header";
import { LoadingButton } from "@mui/lab";
import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import { CustomSnackbar } from "@/components/CustomSnackbar/CustomSnackbar";

const injected = new InjectedConnector({});

export const ClaimPage: React.FC = () => {
  const isMobile = useMediaQuery(mobile);
  const [isProcessing, setIsProcessing] = useState(false);
  const { library, activate, account, active } = useWeb3React();
  const [error, setError] = useState("");
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);

  const claim = async () => {
    setIsProcessing(true);
    if (!active || !account) {
      setIsProcessing(false);
      return;
    }
    try {
      const signature = await library.provider.request({
        method: "personal_sign",
        params: [`$YOU airdrop for TOSHI`, account],
      });
      // Send signature
      // const resp = await callAPI(`/airdrops`, "POST", undefined, {
      //   data: {
      //     type: "TOSHI",
      //     sig: signature,
      //     address: account,
      //   },
      // });
      setIsProcessing(false);
      // if (!resp?.data?.success) {
      //   // redirect to not eligible page
      //   router.push("/not-eligible");
      // } else {
      //   router.push("/missions");
      // }
    } catch (e) {
      console.log(e);
      setIsProcessing(false);
      // router.push("/error");
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
          You are eligible to claim 100 $YOU{" "}
        </Typography>
        <LoadingButton
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
          onClick={connectWallet}
          loading={isProcessing}
        >
          Connect Wallet to Claim
        </LoadingButton>
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
