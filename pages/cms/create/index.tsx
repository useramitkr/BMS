import { createMutation } from "@/customHooks/query/cms.query.hooks";
import { createProps } from "@/typeScript/cms.interface";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Stack,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Modal,
} from "@mui/material";
import toast from "react-hot-toast";

const ProductCreate: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<createProps>();

  const { mutate, isPending } = createMutation();
  const [image, setImage] = useState<File | null>(null);
  const [openModal, setOpenModal] = useState(false);

  const onSubmit = async (formData: createProps) => {
    const { title, description } = formData;

    // Validate image upload
    if (!image) {
      toast.error("Please upload an image!");
      return;
    }

    // Prepare form data
    const formdata = new FormData();
    formdata.append("title", title);
    formdata.append("description", description);
    formdata.append("image", image);

    // Execute mutation
    // mutate(formdata, {
    //   onSuccess: (data) => {
    //     console.log("API Response (Success):", data);
    //     reset();
    //     setImage(null);
    //     toast.success("Product created successfully! ✅");
    //   },
    //   onError: (error) => {
    //     console.error("API Response (Error):", error);
    //   },
    // });
    mutate(formdata, {
      onSuccess: () => {
        reset();
        setImage(null);
        toast.success("Product created successfully");
      },
    });
  };

  // Modal styles
  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Paper
        sx={{
          width: "100%",
          maxWidth: 400,
          p: 3,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography
          variant="h5"
          align="center"
          gutterBottom
          sx={{ mb: 2, color: "#AC3B61", fontWeight: "bold" }}
        >
          Add New Data
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Title Field */}
          <TextField
            {...register("title", { required: "Title is required" })}
            label="Title"
            placeholder="Enter product title"
            fullWidth
            margin="normal"
            error={!!errors.title}
            helperText={errors.title?.message}
          />

          {/* Description Field */}
          <TextField
            {...register("description", { required: "Description is required" })}
            label="Description"
            placeholder="Enter product description"
            fullWidth
            margin="normal"
            multiline
            rows={4}
            error={!!errors.description}
            helperText={errors.description?.message}
          />

          {/* Image Upload Field */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" gutterBottom>
              Product Image:
            </Typography>
            <TextField
              type="file"
              fullWidth
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                if (e.target.files && e.target.files[0]) {
                  setImage(e.target.files[0]);
                }
              }}
              sx={{
                backgroundColor: "white",
                borderRadius: "5px",
                marginBottom: 2,
              }}
            />
            {image && (
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={2}
                sx={{ marginBottom: 2 }}
              >
                <img
                  src={URL.createObjectURL(image)}
                  alt="Product Preview"
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
          </Box>

          {/* Submit Button */}
          <Button
            variant="contained"
            type="submit"
            fullWidth
            sx={{ mt: 3, fontSize: 18, background: "#123C69" }}
            disabled={isPending}
          >
            <b>{isPending ? "Creating..." : "Create Product"}</b>
          </Button>
        </form>

        {/* Help Button */}
        <Button
          variant="outlined"
          fullWidth
          sx={{ mt: 2 }}
          onClick={() => setOpenModal(true)}
        >
          How to Add a Product?
        </Button>

        {/* Modal for Instructions */}
        <Modal
          open={openModal}
          onClose={() => setOpenModal(false)}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <Box sx={modalStyle}>
            <Typography id="modal-title" variant="h6" component="h2">
              Steps to Add a Product
            </Typography>
            <Typography id="modal-description" sx={{ mt: 2 }}>
              1. Enter the product title.
              <br />
              2. Provide a detailed description.
              <br />
              3. Upload an image of the product.
              <br />
              4. Click "Create Product" to submit.
            </Typography>
            <Button
              variant="contained"
              sx={{ mt: 2 }}
              onClick={() => setOpenModal(false)}
            >
              Close
            </Button>
          </Box>
        </Modal>
      </Paper>
    </Box>
  );
};

export default ProductCreate;