//file loaded

import dotenv from "dotenv";
dotenv.config();

import app from "./app";

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
