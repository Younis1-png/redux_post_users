import { render } from "@testing-library/react";
import React from "react";
import { useSelector } from "react-redux";
import { selectAllPosts } from "./PostSlice";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";
const PostList = () => {
  const posts = useSelector(selectAllPosts);

  console.log(posts);

  // new post list at the top of the list
  const orderedPosts = posts
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date));

  // posts
  const renderedPosts = orderedPosts.map((post) => (
    <article key={post.id}>
      <h3>{post.title}</h3>
      <p>{post.content.substring(0, 100)}</p>
      <p className="postsCredit">
        <PostAuthor userId={post.userId} />
        <TimeAgo timestamp={post.date} />

        {/* In our initial state we don't have a userId we only create it   */}
      </p>
      <ReactionButtons post={post} />
    </article>
  ));

  return (
    <section>
      <h2>Posts</h2>
      {renderedPosts}
    </section>
  );
};

export default PostList;
