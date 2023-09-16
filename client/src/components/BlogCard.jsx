import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const BlogCard = ({
  title,
  description,
  image,
  time,
  username,
  blogId,
  isUser,
}) => {
  const navigate = useNavigate();
  //Handle Edit

  const handleEdit = () => {
    navigate(`/blog-details/${blogId}`);
  };

  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(
        `/api/v1/blogs/delete-blog/${blogId}`
      );
      if (data?.success) {
        toast.success("Blog Deleted");
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card
      sx={{
        width: "40%",
        margin: "auto",
        mt: 2,
        padding: 2,
        boxShadow: "5px 5px 10px #ccc",
        ":hover": {
          boxShadow: "10px 10px 20px #ccc",
        },
      }}
    >
      {isUser && (
        <Box display={"flex"}>
          <IconButton onClick={handleEdit}>
            <EditIcon color="info" />
          </IconButton>
          <IconButton onClick={handleDelete}>
            <DeleteIcon color="error" />
          </IconButton>
        </Box>
      )}
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {username?.slice(0, 1).toUpperCase()}
          </Avatar>
        }
        action={<IconButton aria-label="settings"></IconButton>}
        title={username}
        subheader={time}
      />
      <CardMedia component="img" height="194" image={image} alt="Paella dish" />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default BlogCard;
