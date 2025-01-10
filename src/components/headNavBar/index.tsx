"use client";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Link from "next/link";

const HeadNavBar = () => {
  return (
    <AppBar position="static" style={{ backgroundColor: "#4A436C" }}>
      <Toolbar>
        {/* Logo Section */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Box display="flex" alignItems="center">
            <img
              src="/logo.png" // Replace with the actual logo path
              alt="Patriarch Logo"
              style={{ height: "40px", marginRight: "10px" }}
            />
            <span>Patriarch</span>
          </Box>
        </Typography>

        <Box sx={{ display: "flex", gap: "15px", marginRight: 2 }}>
          {[
            "Trang chủ",
            "Mua sắm",
            "Tài chính",
            "Chat",
            "Lịch trình",
            "FAQ",
            "Về chúng tôi",
          ].map((item) => (
            <Link
              key={item}
              href={`/${item.replace(/\s+/g, "").toLowerCase()}`}
              passHref
            >
              <Button
                sx={{ color: "#fff", textTransform: "none", minWidth: 20 }}
              >
                <Typography>{item}</Typography>
              </Button>
            </Link>
          ))}
        </Box>

        {/* Login and Sign Up Buttons */}
        <Box sx={{ display: "flex", gap: "10px" }}>
          <Button
            variant="outlined"
            sx={{
              color: "#4A436C",
              backgroundColor: "#fff",
              textTransform: "none",
              border: "1px solid #4A436C",
            }}
          >
            <Typography fontWeight={"bold"}>Login</Typography>
          </Button>
          <Button
            variant="contained"
            sx={{
              color: "#fff",
              backgroundColor: "#4A436C",
              textTransform: "none",
              ":hover": {
                backgroundColor: "#3E3658",
              },
            }}
          >
            <Typography fontWeight={"bold"}>Sign up</Typography>
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default HeadNavBar;
