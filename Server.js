const express = require("express"),
  dbOperation = require("./dbFiles/dbOperation"),
  cors = require("cors"),
  app = express();

app.use(cors());
app.use(express.json());

app.get("/patientBillSnapshot", (req, res) => {
  dbOperation.getPatientBillSnapshot().then((res) => {
    console.log(res);
  });
});

app.listen(5000, () => {
  console.log(`Server is running on port 5000.`);
});
