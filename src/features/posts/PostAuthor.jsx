import React from "react";
import { useSelector } from "react-redux";
import { selectAllUsers } from "../users/UserSlice";

const PostAuthor = ({ userId }) => {
  const authors = useSelector(selectAllUsers);

  const author = authors.find((user) => user.id === userId); // user.id equal to userId

  return <span>{author ? author.name : "unknown author"}</span>;
};

export default PostAuthor;
