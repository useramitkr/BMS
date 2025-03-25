import {
  Button,
  Paper,
  TextField,
  Typography,
  Avatar,
  Box,
  IconButton,
  Grid,
  Fade,
  Tooltip,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import InfoIcon from "@mui/icons-material/Info";
import { loginMutation } from "@/customHooks/query/auth.query.hooks";
import { loginProps } from "@/typeScript/auth.interface";

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<loginProps>();

  const router = useRouter();
  const { mutate, isPending } = loginMutation();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const onsubmit = async (formData: loginProps) => {
    const { email, password } = formData;
    mutate(
      { email, password },
      {
        onSuccess: (data) => {
          if (data?.status === 200 && data?.token) {
            localStorage.setItem("user", JSON.stringify(data.user));
            setTimeout(() => {
              window.location.href = "/cms/list";
            }, 500);
          } else {
            router.push("/auth/registration");
          }
        },
        onError: () => {
          router.push("/auth/registration");
        },
      }
    );
    reset();
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: "100vh", background: "#F4F4F4" }}
    >
      <Fade in timeout={800}>
        <Paper
          elevation={10}
          sx={{
            padding: 4,
            width: 380,
            borderRadius: 3,
            background: "#FFF",
            boxShadow: "0 6px 25px rgba(0, 0, 0, 0.2)",
          }}
        >
          <Box textAlign="center">
            <Avatar sx={{ background: "#123C69", margin: "0 auto" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography variant="h5" mt={2} fontWeight="bold" color="#333">
              Admin Login
            </Typography>
          </Box>

          <Tooltip title="Admin ID: kr@kr.com | Password: 12345" arrow>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mt: 2,
                color: "#AC3B61",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              <InfoIcon sx={{ mr: 1 }} /> Admin Credentials Available
            </Box>
          </Tooltip>

          <form onSubmit={handleSubmit(onsubmit)}>
            <TextField
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Invalid email format",
                },
              })}
              label="Email"
              placeholder="Enter email"
              fullWidth
              margin="normal"
              error={!!errors.email}
              helperText={errors.email?.message?.toString()}
            />

            <Box sx={{ position: "relative", width: "100%" }}>
              <TextField
                {...register("password", { required: "Password is required" })}
                label="Password"
                type={showPassword ? "text" : "password"}
                fullWidth
                margin="normal"
                error={!!errors.password}
                helperText={errors.password?.message?.toString()}
              />
              <IconButton
                onClick={togglePasswordVisibility}
                sx={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)" }}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </Box>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                mt: 3,
                mb: 2,
                py: 1.5,
                background: "#123C69",
                color: "#fff",
                fontWeight: "bold",
                '&:hover': { background: "#0F2A48" },
              }}
              disabled={isPending}
              startIcon={
                isPending ? (
                  <RotateLeftIcon sx={{ animation: "spin 1s linear infinite" }} />
                ) : null
              }
            >
              {isPending ? "Logging in..." : "Login"}
            </Button>

            <Button
              variant="text"
              fullWidth
              sx={{ color: "#AC3B61", fontWeight: "bold", textTransform: "none" }}
              onClick={() => router.push("/auth/registration")}
            >
              Don't have an account? Sign Up
            </Button>
          </form>
        </Paper>
      </Fade>
    </Grid>
  );
};

export default Login;
