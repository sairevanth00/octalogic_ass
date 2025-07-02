import express from "express";

const app = express();

const port = 4500;

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
