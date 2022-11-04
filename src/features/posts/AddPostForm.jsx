import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { postsAdded } from "./PostSlice";
import { selectAllUsers } from "../users/UserSlice";

const AddPostForm = () => {
  // we don't need these state to be global because we only used them here.
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState();
  const dispatch = useDispatch();

  const users = useSelector(selectAllUsers);
  // console.log(users);

  const onAuthorChanged = (e) => setUserId(e.target.value);

  const onSavePostClicked = () => {
    if (title && content) {
      dispatch(postsAdded(title, content, userId)); // send to prepare call back in postsSlice
    }

    setContent("");
    setTitle("");
  };

  const canSave = Boolean(title) && Boolean(content) && Boolean(userId);

  const usersOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  return (
    <section>
      <h2>Add New Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="postAuthor">Author:</label>
        <select
          name="postAuthor"
          value={userId}
          id="postAuthor"
          onChange={onAuthorChanged}
        >
          <option></option>
          {usersOptions}
        </select>

        <label htmlFor="postContent">Content:</label>
        <input
          type="text"
          id="postContent"
          name="postContent"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button onClick={onSavePostClicked} type="button" disabled={!canSave}>
          Save Post
        </button>
      </form>
    </section>
  );
};

export default AddPostForm;
