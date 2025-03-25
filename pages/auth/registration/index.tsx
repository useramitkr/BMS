import { useState } from "react";
import { useRouter } from "next/router";
import { useForm, FieldValues } from "react-hook-form";
import { registerMutation } from "@/customHooks/query/auth.query.hooks";
import { registerProps } from "@/typeScript/auth.interface";
import {
  Stack,
  TextField,
  Button,
  Box,
  Typography,
  IconButton,
} from "@mui/material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import toast from "react-hot-toast";

const Registration: React.FC = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<registerProps>();
  const { mutate, isPending } = registerMutation();
  const [showPassword, setShowPassword] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (formData: FieldValues) => {
    const { first_name, last_name, email, password } = formData as registerProps;
    const formdata = new FormData();
    formdata.append("first_name", first_name);
    formdata.append("last_name", last_name);
    formdata.append("email", email);
    formdata.append("password", password);
    if (image) {
      formdata.append("profile_pic", image);
    }

    mutate(formdata, {
      onSuccess: () => {
        toast.success("Account created successfully!");
        reset();
        setImage(null);
        router.push("/cms/list"); // Redirect to home page after successful sign-up
      },
      onError: () => {
        toast.error("Registration failed. Please try again.");
      }
    });
  };

  return (
    <Box
      component="form"
      sx={{
        maxWidth: 400,
        mx: "auto",
        mt: 5,
        p: 4,
        borderRadius: 2,
        boxShadow: 3,
        backgroundColor: "#fff",
      }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Typography variant="h4" align="center" sx={{ mb: 3, fontWeight: 600 }}>
        Sign Up
      </Typography>

      <TextField
        {...register("first_name", { required: "First name is required" })}
        label="First Name"
        fullWidth
        error={!!errors.first_name}
        helperText={errors.first_name?.message}
        margin="normal"
      />

      <TextField
        {...register("last_name", { required: "Last name is required" })}
        label="Last Name"
        fullWidth
        error={!!errors.last_name}
        helperText={errors.last_name?.message}
        margin="normal"
      />

      <Box sx={{ position: "relative", width: "100%" }}>
        <TextField
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email format",
            },
          })}
          label="Email"
          type="email"
          fullWidth
          error={!!errors.email}
          helperText={errors.email?.message}
          margin="normal"
        />
        <EmailOutlinedIcon
          sx={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)" }}
        />
      </Box>

      <Box sx={{ position: "relative", width: "100%" }}>
        <TextField
          {...register("password", { required: "Password is required" })}
          label="Password"
          type={showPassword ? "text" : "password"}
          fullWidth
          error={!!errors.password}
          helperText={errors.password?.message}
          margin="normal"
        />
        <IconButton
          onClick={togglePasswordVisibility}
          sx={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)" }}
        >
          {showPassword ? <VisibilityOff /> : <Visibility />}
        </IconButton>
      </Box>

      <TextField
        type="file"
        fullWidth
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
          }
        }}
        error={!!errors.profile_pic}
        helperText={errors.profile_pic?.message}
        sx={{ backgroundColor: "white", borderRadius: "5px", my: 2 }}
      />

      {image && (
        <Stack direction="row" justifyContent="center" alignItems="center" spacing={2} sx={{ mb: 2 }}>
          <img
            src={URL.createObjectURL(image)}
            alt="Profile Preview"
            style={{
              width: 100,
              height: 100,
              borderRadius: "50%",
              objectFit: "cover",
              border: "2px solid #ddd",
            }}
          />
          <Typography variant="caption">{image.name}</Typography>
        </Stack>
      )}

      <Button
        type="submit"
        variant="contained"
        fullWidth
        sx={{ padding: 1.5, fontWeight: 600, backgroundColor: "#123C69" }}
        disabled={isPending}
      >
        {isPending ? "Registering..." : "Register Now!"}
      </Button>

      <Typography align="center" sx={{ mt: 2 }}>
        Already have an account?{" "}
        <Button variant="text" onClick={() => router.push("/")}>
          Login
        </Button>
      </Typography>
    </Box>
  );
};

export default Registration;
