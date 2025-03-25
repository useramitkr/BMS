import React from "react";
import {
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  Link,
  Divider,
} from "@mui/material";

const Documentation: React.FC = () => {
  return (
    <Box sx={{ padding: 4, maxWidth: "800px", margin: "0 auto" }}>
      {/* Title */}
      <Typography variant="h3" gutterBottom fontWeight="bold">
        Project Documentation
      </Typography>

      {/* Introduction */}
      <Typography variant="h5" gutterBottom fontWeight="bold" mt={4}>
        Introduction
      </Typography>
      <Typography variant="body1" paragraph>
        This project is a **Product Management System** built using modern web technologies. It allows users to create, view, update, and delete products. The application also includes user authentication (signup, login, and profile management).
      </Typography>

      {/* Technologies Used */}
      <Typography variant="h5" gutterBottom fontWeight="bold" mt={4}>
        Technologies Used
      </Typography>
      <List>
        <ListItem>
          <ListItemText primary="Frontend: React, Next.js, Material-UI" />
        </ListItem>
        <ListItem>
          <ListItemText primary="State Management: Zustand" />
        </ListItem>
        <ListItem>
          <ListItemText primary="API Handling: Axios, React Query" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Form Handling: React Hook Form" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Routing: React Router DOM" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Notifications: React Hot Toast" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Authentication: React Cookie" />
        </ListItem>
      </List>

      {/* API Documentation */}
      <Typography variant="h5" gutterBottom fontWeight="bold" mt={4}>
        API Documentation
      </Typography>
      <Typography variant="body1" paragraph>
        The application interacts with the following APIs:
      </Typography>

      {/* Product APIs */}
      <Typography variant="h6" gutterBottom fontWeight="bold" mt={2}>
        Product APIs
      </Typography>
      <List>
        <ListItem>
          <ListItemText
            primary="Create Product"
            secondary={
              <>
                <strong>Endpoint:</strong> POST /api/product/create
                <br />
                <strong>Headers:</strong> x-access-token (User Token)
                <br />
                <strong>Parameters:</strong> title (String), description (String), image (File)
              </>
            }
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Get Product Details"
            secondary={
              <>
                <strong>Endpoint:</strong> GET /api/product/detail/:id
                <br />
                <strong>Headers:</strong> x-access-token (User Token)
                <br />
                <strong>Parameters:</strong> id (ObjectId)
              </>
            }
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="List Products"
            secondary={
              <>
                <strong>Endpoint:</strong> POST /api/product/list
                <br />
                <strong>Headers:</strong> x-access-token (User Token)
                <br />
                <strong>Parameters:</strong> page (Number), perpage (Number)
              </>
            }
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Delete Product"
            secondary={
              <>
                <strong>Endpoint:</strong> POST /api/product/remove
                <br />
                <strong>Headers:</strong> x-access-token (User Token)
                <br />
                <strong>Parameters:</strong> id (ObjectId)
              </>
            }
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Update Product"
            secondary={
              <>
                <strong>Endpoint:</strong> POST /api/product/update
                <br />
                <strong>Headers:</strong> x-access-token (User Token)
                <br />
                <strong>Parameters:</strong> id (ObjectId), title (String), description (String), image (File)
              </>
            }
          />
        </ListItem>
      </List>

      {/* User APIs */}
      <Typography variant="h6" gutterBottom fontWeight="bold" mt={2}>
        User APIs
      </Typography>
      <List>
        <ListItem>
          <ListItemText
            primary="User Signup"
            secondary={
              <>
                <strong>Endpoint:</strong> POST /api/user/signup
                <br />
                <strong>Parameters:</strong> first_name (String), last_name (String), email (String), password (String), profile_pic (File)
              </>
            }
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="User Login"
            secondary={
              <>
                <strong>Endpoint:</strong> POST /api/user/signin
                <br />
                <strong>Parameters:</strong> email (String), password (String)
              </>
            }
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="User Profile Details"
            secondary={
              <>
                <strong>Endpoint:</strong> GET /api/user/profile-details
                <br />
                <strong>Headers:</strong> x-access-token (User Token)
              </>
            }
          />
        </ListItem>
      </List>

      {/* Routes */}
      <Typography variant="h5" gutterBottom fontWeight="bold" mt={4}>
        Application Routes
      </Typography>
      <List>
        <ListItem>
          <ListItemText
            primary="Home Page"
            secondary={<Link href="/">/</Link>}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Add Product"
            secondary={<Link href="/cms/create">/cms/create</Link>}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="All Products"
            secondary={<Link href="/cms/list">/cms/list</Link>}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Product Details"
            secondary={<Link href="/cms/details/:id">/cms/details/:id</Link>}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="User Login"
            secondary={<Link href="/auth/login">/auth/login</Link>}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="User Signup"
            secondary={<Link href="/auth/signup">/auth/signup</Link>}
          />
        </ListItem>
      </List>

      {/* Dependencies */}
      <Typography variant="h5" gutterBottom fontWeight="bold" mt={4}>
        Dependencies
      </Typography>
      <Typography variant="body1" paragraph>
        Below is the list of dependencies used in this project:
      </Typography>
      <List>
        <ListItem>
          <ListItemText primary="@emotion/react, @emotion/styled" />
        </ListItem>
        <ListItem>
          <ListItemText primary="@mui/icons-material, @mui/material" />
        </ListItem>
        <ListItem>
          <ListItemText primary="@tanstack/react-query" />
        </ListItem>
        <ListItem>
          <ListItemText primary="axios" />
        </ListItem>
        <ListItem>
          <ListItemText primary="next, react, react-dom" />
        </ListItem>
        <ListItem>
          <ListItemText primary="react-bootstrap-sweetalert" />
        </ListItem>
        <ListItem>
          <ListItemText primary="react-cookie" />
        </ListItem>
        <ListItem>
          <ListItemText primary="react-hook-form" />
        </ListItem>
        <ListItem>
          <ListItemText primary="react-hot-toast" />
        </ListItem>
        <ListItem>
          <ListItemText primary="react-router-dom" />
        </ListItem>
        <ListItem>
          <ListItemText primary="zustand" />
        </ListItem>
      </List>

      {/* Conclusion */}
      <Typography variant="h5" gutterBottom fontWeight="bold" mt={4}>
        Conclusion
      </Typography>
      <Typography variant="body1" paragraph>
        This documentation provides a comprehensive overview of the project, including the technologies used, API details, application routes, and dependencies. For further assistance, refer to the codebase or contact the development team.
      </Typography>
    </Box>
  );
};

export default Documentation;