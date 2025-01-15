const express = require("express");
const bodyParser = require("body-parser");
const supplierRoutes = require("./routes/suppliers");

const app = express();

app.use(bodyParser.json());
app.use("/suppliers", supplierRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
