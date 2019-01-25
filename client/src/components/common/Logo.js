import React from "react";
import logo from "./logo.png";

export default function Logo() {
  return (
    <div>
      <img
        src={logo}
        alt="Logo"
        style={{ height: "100px", margin: "auto", display: "inline-block" }}
      />
    </div>
  );
}
