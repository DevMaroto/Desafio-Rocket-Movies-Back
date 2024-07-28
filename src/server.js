require("dotenv/config");
require("express-async-errors");
const express = require("express");
const cors = require("cors");

const AppError = require("./utils/AppError.js");
const migrationsRun = require("./database/sqlite/migrations");
const uploadConfig = require("../src/configs/upload");

// importar a routes
const routes = require("./routes");

migrationsRun();

const app = express();
app.use(express.json());

app.use(cors());

// e depois de importar não se esqueça de usar ela
app.use(routes);

app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER));


// aqui a gente esta vendo se é o error do cliente ou do servidor
app.use((error, req, res, next) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: "error",
      message: error.message
    });
  }

  console.log(error);

  return res.status(500).json({
    status: "error",
    message: "Internal server error"
  });
});

const PORT = 3333;
app.listen(PORT, () => console.log(`Server listening on Port ${PORT}`));