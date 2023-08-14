import { Stack, Typography, useMediaQuery } from "@mui/material";
import { mobile } from "@/constants/constants";

export const Airdropping: React.FC = () => {
  const isMobile = useMediaQuery(mobile);

  return (
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
        src="/assets/logo.png"
        width={48}
        height={48}
        style={{
          objectFit: "contain",
        }}
      />
      <Typography
        variant="headlineLarge"
        pl={isMobile ? 1 : 6}
        pr={isMobile ? 1 : 6}
      >
        Airdropping your token
      </Typography>
    </Stack>
  );
};
