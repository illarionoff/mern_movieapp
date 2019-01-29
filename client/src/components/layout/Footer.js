import React from "react";
import TheMoviedb from "../common/TheMoviedb";

export default function Footer() {
  return (
    <footer>
      <div>
        <p>Copyright &copy; {new Date().getFullYear()}</p>
        <p>Powered by NewsAPI.org</p>
      </div>

      <TheMoviedb />
    </footer>
  );
}
