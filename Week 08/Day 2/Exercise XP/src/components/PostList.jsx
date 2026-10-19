import React from 'react';

const PostList = ({ posts }) => {
  return (
    <div className="post-list">
      {posts.map((post) => (
        <article key={post.id} className="post">
          <h3>{post.title}</h3>
          <p>{post.content}</p>
        </article>
      ))}
    </div>
  );
};

export default PostList;
