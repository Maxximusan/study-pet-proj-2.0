//EEq9B7n3K36WUINN  ---------- пароль
//76я строку добавляем в .gitignore - если небыло
const express = require("express");
const logger = require("morgan");
const cors = require("cors");

require("dotenv").config();

const usersRouter = require("./routes/api/auth.routes");
const contactsRouter = require("./routes/api/contacts.routes");
const currentUserRouter = require("./routes/api/currentUser.routes");
const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/users", usersRouter);
app.use("/api/users/user", currentUserRouter);
app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server Error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
