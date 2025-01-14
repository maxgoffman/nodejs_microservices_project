const express = require("express");
const bodyParser = require("body-parser");
const clientRoutes = require("./routes/clients");

const app = express();

app.use(bodyParser.json());
app.use("/clients", clientRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
