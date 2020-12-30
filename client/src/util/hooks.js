import { useState } from "react";

const onChange = (e) => {
  setValues({
    ...values,
    [e.target.name]: e.target.value,
  });
};
