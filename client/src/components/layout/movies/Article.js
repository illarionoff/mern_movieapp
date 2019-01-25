import React from "react";

export default function Article({ article }) {
  const { title, urlToImage, url } = article;

  const newTitle = title.replace(/<em>/g, "").replace(/<\/em>/g, "");

  return (
    <div className="section-featured-body-article">
      <img
        className="section-featured-body-article-image"
        src={urlToImage}
        alt=""
      />

      <div className="section-featured-body-article-info">
        <a href={url} target="_blank" rel="noopener noreferrer">
          <h3>{newTitle}</h3>
        </a>
      </div>
    </div>
  );
}
