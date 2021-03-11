import React from "react";
import Header from "../components/Header";

export default function LandingPage() {
  return (
    <div className="sm:grid grid-cols-layout">
      <Header />
      <h1>Landing Page</h1>
      <h2>Welcome to the BookLists App</h2>
    </div>
  );
}
