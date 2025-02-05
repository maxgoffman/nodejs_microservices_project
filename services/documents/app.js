const express = require("express");
const documentRoutes = require("./routes/documents");

const app = express();

app.use(express.json());
app.use("/documents", documentRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
