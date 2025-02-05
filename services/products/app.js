const express = require("express");
const bodyParser = require("body-parser");
const productRoutes = require("./routes/products");

const app = express();

app.use(express.json());
app.use("/products", productRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
