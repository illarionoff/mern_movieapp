import React from "react";
import themdbLogo from "./themdb-logo.png";

export default function TheMoviedb() {
  return (
    <div>
      <img
        src={themdbLogo}
        alt="Powered by The MovieDB"
        style={{ height: "50px", margin: "auto", display: "inline-block" }}
      />
    </div>
  );
}
