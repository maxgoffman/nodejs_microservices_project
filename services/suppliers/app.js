const express = require("express");
const supplierRoutes = require("./routes/suppliers");

const app = express();

app.use(express.json());
app.use("/suppliers", supplierRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
