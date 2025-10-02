const express = require("express");
require("dotenv").config();
const routes = require("./routes");

const app = express();
app.use(express.json());

app.get("/", (req, res) => res.send("Task Manager API is running 🚀"));
app.use("/api", routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
