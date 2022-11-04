import { createSlice, nanoid } from "@reduxjs/toolkit";
import { sub } from "date-fns";

const initialState = [
  {
    id: 1,
    title: "Learn Redux Toolkit",
    content: "I've heard good things about you",
    date: sub(new Date(), { minutes: 10 }).toISOString(),
    reactions: {
      thumbsUp: 11,
      wow: 10,
      heart: 2,
      rocket: 30,
      coffee: 8,
    },
  },
  {
    id: 2,
    title: "Do you know javascript and react ",
    content: "The more I say slice, the more I want pizza ",
    date: sub(new Date(), { minutes: 5 }).toISOString(),
    reactions: {
      thumbsUp: 0,
      wow: 0,
      heart: 0,
      rocket: 0,
      coffee: 0,
    },
  },
];

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postsAdded: {
      reducer(state, action) {
        // our action
        state.push(action.payload); // action.payload is the result we]re getting
      },
      prepare(title, content, userId) {
        // prepare call back, or what we get from user
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            date: new Date().toISOString(),
            userId,

            reactions: {
              thumbsUp: 0,
              wow: 0,
              heart: 0,
              rocket: 0,
              coffee: 0,
            },
          },
        };
      },
    },

    // our reaction reducer
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload;
      const existingPost = state.find((post) => post.id === postId);
      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    },
  },
});

export const selectAllPosts = (state) => state.posts;
export const { postsAdded, reactionAdded } = postSlice.actions;
export default postSlice.reducer;
