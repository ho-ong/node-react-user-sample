import React, { useEffect } from "react";
import axios from "axios";

function LandingPage() {
  // axios test
  useEffect(() => {
    axios.get("/api/hello").then((res) => console.log(res.data));
  }, []);

  return (
    <div className="container-center">
      <h1>LandingPage</h1>
    </div>
  );
}

export default LandingPage;
