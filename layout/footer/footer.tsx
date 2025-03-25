import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Grid,
  Link,
  IconButton,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

const Footer: React.FC = () => {
  return (
    <Box sx={{ mt: 4 }}>
      <AppBar
        position="static"
        sx={{
          top: "auto",
          bottom: 0,
          backgroundColor: "#1e1e1e",
          padding: "20px 0",
          textAlign: "center",
        }}
      >
        <Toolbar>
          <Grid container spacing={2} justifyContent="center">
            {/* Useful Links */}
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <Typography variant="h6" color="white" gutterBottom>
                  Quick Links
                </Typography>
                <Link
                  href="/auth/login"
                  color="inherit"
                  underline="hover"
                  sx={{ color: "white", "&:hover": { color: "#ff4081" } }}
                >
                  Login
                </Link>
                <Link
                  href="/cms/list"
                  color="inherit"
                  underline="hover"
                  sx={{ color: "white", "&:hover": { color: "#ff4081" } }}
                >
                  All Products
                </Link>
                <Link
                  href="/cms/create"
                  color="inherit"
                  underline="hover"
                  sx={{ color: "white", "&:hover": { color: "#ff4081" } }}
                >
                  Add Product
                </Link>
              </Box>
            </Grid>

            {/* Social Media Icons */}
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <Typography variant="h6" color="white" gutterBottom>
                  Follow Me
                </Typography>
                <Box>
                  <IconButton
                    href="https://github.com/useramitkr/"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ color: "white", "&:hover": { color: "#ff4081" } }}
                  >
                    <GitHubIcon />
                  </IconButton>
                  <IconButton
                    href="https://www.linkedin.com/in/useramitkr/"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ color: "white", "&:hover": { color: "#ff4081" } }}
                  >
                    <LinkedInIcon />
                  </IconButton>
                  
                  <IconButton
                    href="https://instagram.com/belikeame"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ color: "white", "&:hover": { color: "#ff4081" } }}
                  >
                    <InstagramIcon />
                  </IconButton>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Toolbar>

        {/* Copyright Text */}
        <Typography
          variant="body2"
          color="white"
          align="center"
          sx={{ mt: 2 }}
        >
          © {new Date().getFullYear()} Amit Kumar | All Rights Reserved
        </Typography>
      </AppBar>
    </Box>
  );
};

export default Footer;