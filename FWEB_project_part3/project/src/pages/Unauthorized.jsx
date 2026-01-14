
import { useNavigate,Link, useSearchParams } from "react-router";
const  Unauthorized = () => {
  const navigate = useNavigate();
  return (
    <>
    <nav><h1>Unauthorized</h1></nav>
    <button onClick={() => navigate('/')} className="btn-back" style={{ float: "center" }}>Back</button>
    <br></br>
    <br></br>
      <h1>Unauthorized - Access Denied</h1>
    </>
    );
};
export default Unauthorized;
