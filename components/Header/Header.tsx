import { mobile } from "@/constants/constants";
import { Stack, Typography, useMediaQuery } from "@mui/material";
import Link from "next/link";
import { HeaderMobile } from "./HeaderMobile";

export const Header: React.FC = () => {
  const isMobile = useMediaQuery(mobile);

  if (isMobile) return <HeaderMobile />;

  return (
    <Stack
      position="fixed"
      direction="row"
      width="100%"
      gap={6}
      pt={isMobile ? 2 : 3}
      pb={isMobile ? 2 : 3}
      justifyContent="center"
      sx={{
        top: 0,
        left: 0,
        zIndex: 1000,
      }}
    >
      <Link
        href="https://youcoin.org/"
        target="_blank"
        style={{
          textDecoration: "none",
        }}
      >
        <Typography
          variant="bodySmall"
          fontSize={16}
          fontWeight={300}
          sx={{
            "&:hover": {
              fontWeight: 700,
            },
          }}
        >
          HOME
        </Typography>
      </Link>
      <Link
        href="https://whitepaper.youcoin.org/"
        target="_blank"
        style={{
          textDecoration: "none",
        }}
      >
        <Typography
          variant="bodySmall"
          fontSize={16}
          fontWeight={300}
          sx={{
            "&:hover": {
              fontWeight: 700,
            },
          }}
        >
          WHITEPAPER
        </Typography>
      </Link>
      <Link
        href="https://www.sushi.com/swap?fromChainId=8453&fromCurrency=NATIVE&toChainId=8453&toCurrency=0x0FA70E156Cd3B03aC4080bfe55BD8AB50f5Bcb98"
        target="_blank"
        style={{
          textDecoration: "none",
        }}
      >
        <Typography
          variant="bodySmall"
          fontSize={16}
          fontWeight={300}
          sx={{
            "&:hover": {
              fontWeight: 700,
            },
          }}
        >
          $YOU
        </Typography>
      </Link>
      <Stack
        direction="column"
        gap={1}
        alignItems="flex-end"
        position="fixed"
        sx={{
          top: 24,
          right: 24,
        }}
      >
        <Link
          href="https://basescan.org/token/0x0fa70e156cd3b03ac4080bfe55bd8ab50f5bcb98"
          target="_blank"
          style={{
            textDecoration: "none",
          }}
        >
          <Typography
            variant="bodyMedium"
            color="#1C1C1E"
            fontWeight={700}
            fontSize={12}
          >
            Wallet Connected
          </Typography>
        </Link>
        <Typography
          variant="bodyMedium"
          color="#1C1C1E"
          fontWeight={300}
          fontSize={12}
        >
          0x0FA70E156...
        </Typography>
      </Stack>
    </Stack>
  );
};
