import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  CardActions,
  Grid,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Switch,
  FormControlLabel,
  CircularProgress,
  Pagination,
  TextField,
  IconButton, // Added for search input
} from "@mui/material";
import { useState } from "react";
import toast from "react-hot-toast";
import SweetAlertComponent from "@/ui/sweetalert";
import {
  allProductsQuery,
  deleteMutation,
} from "@/customHooks/query/cms.query.hooks";
import { productt } from "@/api/axios/axios";
import Details from "../details";
import { Delete, Edit, Visibility } from "@mui/icons-material";
import {productss} from "@/typeScript/cms.interface"

export default function List() {
  const [page, setPage] = useState(1);
  const [isTableView, setIsTableView] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [productId, setProductId] = useState<string | number | null>(null);
  const [modal, setModal] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); 

  const perPage = 10;

  const {
    data: list,
    isPending,
    isError,
    error,
  } = allProductsQuery(page, perPage);

  const totalPages = (list as any)?.data.totalPages || 1;
  const products = (list as any)?.data.data || [];

  const { mutate, isPending: isDeleting } = deleteMutation();

  const toggleView = () => setIsTableView((prev) => !prev);

  const handleDelete = () => {
    if (!deleteId) return;

    const formData = new FormData();
    formData.append("id", deleteId);

    mutate(formData, {
      onSuccess: () => {
        toast.success("Product deleted successfully!");
        setModal(false);
        setDeleteId(null);
      },
      onError: () => {
        toast.error("Failed to delete the product. Try again.");
      },
    });
  };

  const handleOpenModal = (id: string | number) => {
    setProductId(id);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setProductId(null);
  };

  // Filter products based on search term
  const filteredProducts = products.filter((product: any) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );


  //Default Image 
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.src = "https://crankwheel.com/static/images/uploads/2019/06/12/CW_How%20to%20deliver%20the%20perfect%20instant%20online%20product%20demo.jpg";
  };

  //List View Area 

  // const renderTableRow = (product: any) => (
  //   <TableRow key={product._id}>
  //     <TableCell>
  //       <img
  //         src={productt(product.image) || "/placeholder.jpg"}
  //         alt={product.title}
  //         style={{ height: "100px", objectFit: "contain" }}
  //       />
  //     </TableCell>
  //     <TableCell>{product.title}</TableCell>
  //     <TableCell>{product.description}</TableCell>
  //     <TableCell align="center">
  //       <Button
  //         variant="contained"
  //         sx={{ background: "#123C69", m: "5px" }}
  //         onClick={() => handleOpenModal(product._id)}
  //       >
  //         View
  //       </Button>
  //       <Button
  //         variant="contained"
  //         sx={{ background: "#123C69", m: "5px" }}
  //         onClick={() => {
  //           setDeleteId(product._id);
  //           setModal(true);
  //         }}
  //       >
  //         Delete
  //       </Button>
  //       <Button
  //         href={`/cms/list/${product._id}`}
  //         variant="contained"
  //         sx={{ background: "#123C69", m: "5px" }}
  //       >
  //         Edit
  //       </Button>
  //     </TableCell>
  //   </TableRow>
  // );

  const renderTableRow = (product: productss) => (
    <TableRow key={product._id}>
      <TableCell>
        <img
          src={productt(product.image) || "/placeholder.jpg"}
          alt={product.title}
          style={{ height: "100px", objectFit: "contain" }}
          onError={handleImageError}
        />
      </TableCell>
      <TableCell>{product.title}</TableCell>
      <TableCell>{product.description}</TableCell>
      <TableCell align="center">
        <Box display="flex" justifyContent="center" gap="8px">
          <IconButton
            color="primary"
            onClick={() => handleOpenModal(product._id)}
          >
            <Visibility />
          </IconButton>
          <IconButton
            color="error"
            onClick={() => {
              setDeleteId(product._id);
              setModal(true);
            }}
          >
            <Delete />
          </IconButton>
          <IconButton color="secondary" href={`/cms/list/${product._id}`}>
            <Edit />
          </IconButton>
        </Box>
      </TableCell>
    </TableRow>
  );

  const renderCard = (product: any) => (
    <Grid item xs={12} sm={6} md={4} key={product._id}>
      <Card
        sx={{
          background: "#F6F0ED",
          transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
          "&:hover": { transform: "scale(1.05)", boxShadow: 8 },
        }}
      >
        <CardMedia
          component="img"
          height="200"
          image={productt(product.image) || "/placeholder.jpg"}
          alt={product.title}
          sx={{ objectFit: "contain", mt: "8px" }}
          onError={handleImageError}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div" align="center">
            {product.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center">
            {product.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Box
            display="flex"
            justifyContent="space-between"
            width="100%"
            sx={{
              padding: 1,
              border: "1px solid #ccc",
              borderRadius: "8px",
              gap: 2,
            }}
          >
            <Box>
              <Button
                variant="contained"
                size="medium"
                sx={{ background: "#123C69" }}
                onClick={() => handleOpenModal(product._id)}
              >
                View Details
              </Button>
            </Box>
            <Button
              variant="contained"
              size="medium"
              sx={{ background: "#123C69" }}
              onClick={() => {
                setDeleteId(product._id);
                setModal(true);
              }}
            >
              Delete
            </Button>
            <Button
              href={`/cms/list/${product._id}`}
              variant="contained"
              size="medium"
              sx={{ background: "#123C69" }}
            >
              Edit
            </Button>
          </Box>
        </CardActions>
      </Card>
    </Grid>
  );

  return (
    <>
      <Box
        sx={{
          maxWidth: "1600px",
          margin: "0 auto",
          padding: "0 16px",
        }}
      >
        {/* Search Input Field */}
        <TextField
          fullWidth
          label="Search by Title"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
            mb: 4,
            mt: 4,
            background: "#fff",
            borderRadius: "4px"
          }}
        />

        <FormControlLabel
          sx={{ color: "#123C69" }}
          control={
            <Switch
              style={{ color: "#AC3B61" }}
              checked={isTableView}
              onChange={toggleView}
            />
          }
          label="Table View"
        />

        {isPending ? (
          <CircularProgress sx={{ display: "block", margin: "20px auto" }} />
        ) : isError ? (
          <Typography align="center" color="error">
            Failed to load products. Please try again later.
          </Typography>
        ) : filteredProducts.length === 0 ? (
          <Typography align="center">No products found.</Typography>
        ) : isTableView ? (
          <TableContainer
            component={Paper}
            sx={{ borderRadius: "10px", background: "#EDC7B7" }}
          >
            <Table sx={{ background: "#F6F0ED" }}>
              <TableHead>
                <TableRow>
                  <TableCell>Image</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{filteredProducts.map(renderTableRow)}</TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Grid container spacing={4}>
            {filteredProducts.map(renderCard)}
          </Grid>
        )}

        {modal && (
          // <SweetAlertComponent
          //   confirm={handleDelete}
          //   cancle={() => setModal(false)}
          //   title="Are You Sure?"
          //   subtitle="You will not be able to recover this product"
          //   type="warning"
          // />
          <SweetAlertComponent
            confirm={handleDelete}
            cancle={() => setModal(false)}
            title="Are You Sure?"
            subtitle="You will not be able to recover this product"
            type="warning"
            user="admin"
            confirmBtnText="Yes, delete it!"
            confirmBtnBsStyle="danger" 
            cancelBtnBsStyle="default" 
            showCancel="true"
          />
        )}

        {productId !== null && (
          <Details
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            id={productId}
          />
        )}

        {filteredProducts && (
          <Box display="flex" justifyContent="center" mt={4}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={(event, value) => setPage(value)}
              color="primary"
              siblingCount={1}
              boundaryCount={1}
              size="large"
              sx={{
                "& .MuiPaginationItem-root": {
                  fontWeight: "bold",
                  fontSize: "1rem",
                },
              }}
            />
          </Box>
        )}
      </Box>
    </>
  );
}