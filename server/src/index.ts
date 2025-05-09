import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import * as dynamoose from "dynamoose";
import courseRoutes from "./routes/courseRoutes";

/* Routes imports */

/*Configuration*/

dotenv.config();

const isProduction = process.env.NODE_ENV === "Productions";

if (!isProduction) {
  dynamoose.aws.ddb.local();
}

const app = express();
app.use(express.json());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/*routes */
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/courses", courseRoutes);

/*server*/
const port = process.env.PORT ?? 3000;

if (!isProduction) {
  app.listen(port, () => {
    console.log(`Server Running in ${port}`);
  });
}
