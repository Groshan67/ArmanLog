import React , {useEffect,useState} from 'react'


const PatientBillSnapshot = ()=>{
const [prv,setPrv] = useState("");

useEffect(()=>{
  fetch("http://localhost:5000/patientBillSnapshot")
  .then((res)=>res.json())
  .then((data)=>setPrv(data.prv));
},[]);

return(
  <div >
    <h1>{prv}</h1>
  </div>
)

}
export default PatientBillSnapshot;
