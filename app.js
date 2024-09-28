const express = require("express");
const logger = require("morgan");
const cors = require("cors");
// const authRouter = require("./routes/auth.routes");
// const products = require("./data/example-products");
const contactsRouter = require("./routes/api/contacts.routes");
const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

//если GET запрос на адресс / , выполнить эту ф-ю
// app.get("/", (request, responce) => {
//   console.log(request.url);
//   console.log(request.method);
//   console.log(request.headers);
//   res.json({
//     status: "success",
//     code: 200,
//     data: {
//       result: products,
//     },
//   });
// });

// app.get("/confuckers", (req, res) => {
//   res.send("<h1> HELLO GUYS</h2>");
// });

// app.get("/api/auth", auth.routes);
app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server Error" } = err;
  res.status(status).json({ message });
});

app.listen(7000, () => console.log("Server running"));
