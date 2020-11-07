import React, { useEffect, useState } from "react";
import cm from "./notfound.module.css";

import { useHistory } from "react-router-dom";

const NotFound = () => {
  let history = useHistory();

  return (
    <div>
      Not Found
    </div>
  );
};

export default NotFound;
