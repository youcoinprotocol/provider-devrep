import { useState } from "react";
import { mobile } from "@/constants/constants";
import {
  Menu,
  MenuItem,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Link from "next/link";
import { HeaderMobile } from "./HeaderMobile";
import { useWeb3React } from "@web3-react/core";
import { useRouter } from "next/navigation";

var truncate = function (fullStr: string, strLen: number, separator: string) {
  if (fullStr.length <= strLen) return fullStr;

  separator = separator || "...";

  var sepLen = separator.length,
    charsToShow = strLen - sepLen,
    frontChars = Math.ceil(charsToShow / 2),
    backChars = Math.floor(charsToShow / 2);

  return (
    fullStr.substring(0, frontChars) +
    separator +
    fullStr.substring(fullStr.length - backChars)
  );
};

export const Header: React.FC = () => {
  const isMobile = useMediaQuery(mobile);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openMenu, setOpenMenu] = useState(false);
  const { library, activate, account, active, deactivate } = useWeb3React();
  const router = useRouter();

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
        href="/"
        style={{
          textDecoration: "none",
        }}
      >
        <Typography
          variant="bodyMedium"
          fontSize={14}
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
          variant="bodyMedium"
          fontSize={14}
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
          variant="bodyMedium"
          fontSize={14}
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
      {!!account && (
        <Stack
          direction="column"
          gap={1}
          alignItems="flex-end"
          position="fixed"
          sx={{
            top: 24,
            right: 24,
            cursor: "pointer",
          }}
          ref={(el) => setAnchorEl(el)}
          onClick={() => {
            setOpenMenu(true);
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
          <Typography
            variant="bodyMedium"
            color="#1C1C1E"
            fontWeight={300}
            fontSize={12}
          >
            {truncate(account, 20, "...")}
          </Typography>
        </Stack>
      )}
      <Menu
        anchorEl={anchorEl}
        open={openMenu}
        onClose={() => {
          setOpenMenu(false);
        }}
        sx={{
          mt: 2,
        }}
      >
        <MenuItem
          onClick={() => {
            deactivate();
            setOpenMenu(false);
            router.push("/");
          }}
        >
          Logout
        </MenuItem>
      </Menu>
    </Stack>
  );
};
