"use client";

import React from "react";
import { ThemeOptions, ThemeProvider, createTheme } from "@mui/material";
import { TypographyOptions } from "@mui/material/styles/createTypography";
import { useAppSelector } from "@/redux/hooks";
import { Home } from "@/components/Home/Home";
import { Header } from "@/components/Header/Header";

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    hero: true;
    superscript: true;
    bodyMedium: true;
    bodySmall: true;
    headlineLarge: true;
    headlineMedium: true;
    headlineMediumNoGradient: true;
    headlineSmall: true;
    notice: true;
  }
}

interface ExtendedTypographyOptions extends TypographyOptions {
  hero: React.CSSProperties;
  superscript: React.CSSProperties;
  bodyMedium: React.CSSProperties;
  bodySmall: React.CSSProperties;
  headlineLarge: React.CSSProperties;
  headlineMedium: React.CSSProperties;
  headlineMediumNoGradient: React.CSSProperties;
  headlineSmall: React.CSSProperties;
  notice: React.CSSProperties;
}

const defaultTheme = createTheme();

export const theme = createTheme({
  typography: {
    fontSize: 14,
    fontFamily: "Roboto, Helvetica, Arial, sans-serif",
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        hero: {
          fontSize: 60,
          fontWeight: 700,
          background: "linear-gradient(45deg, #004DFF 0%, #00DBFF 100%)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        },
        superscript: {
          color: "#3B3F53",
          fontSize: 16,
          fontWeight: 700,
        },
        bodyMedium: {
          color: "rgba(28, 28, 30, 1)",
          fontSize: 18,
          fontWeight: 300,
        },
        bodySmall: {
          color: "#3B3F53",
          fontSize: 14,
          fontWeight: 400,
          whiteSpace: "pre-line",
          lineHeight: 1.5,
        },
        headlineLarge: {
          color: "rgba(28, 28, 30, 1)",
          fontSize: 60,
          fontWeight: 500,
        },
        headlineMedium: {
          fontSize: 28,
          fontWeight: 300,
          color: "rgba(28, 28, 30, 1)",
          [defaultTheme.breakpoints.down("md")]: {
            fontSize: 20,
          },
        },
        headlineMediumNoGradient: {
          fontSize: 48,
          fontWeight: 700,
        },
        headlineSmall: {
          backgroundImage: "linear-gradient(45deg, #004DFF 0%, #00DBFF 100%)",
          fontSize: 14,
          fontWeight: 700,
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          whiteSpace: "pre-wrap",
        },
        notice: {
          color: "#FDFDFD",
          fontSize: 13,
          whiteSpace: "pre-line",
        },
      } as ExtendedTypographyOptions,
    },
  },
} as ThemeOptions);

export default function Page() {
  const user = useAppSelector((state) => state.user.user);

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Home />
    </ThemeProvider>
  );
}
