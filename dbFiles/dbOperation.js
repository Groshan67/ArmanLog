const config = require("./dbConfig"),
  sql = require("mssql");

const getPatientBillSnapshot = async () => {
  try {
    let pool = await sql.connect(config);
    let PatientBillSnapshot = pool
      .request()
      .query("SELECT * from PatientBillSnapshot");
    console.log(PatientBillSnapshot);
    return PatientBillSnapshot;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getPatientBillSnapshot,
};
