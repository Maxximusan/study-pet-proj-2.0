const express = require("express");
const cors = require("cors");
const authRouter = require("./routes/auth.routes");
// const products = require("./data/example-products");

const app = express();

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

app.get("/api/auth", authRouter);

app.listen(7000, () => console.log("Server running"));
