// import "./newproduct.css";
// import { useParams } from "react-router-dom";
import React from "react";

export default function Invoice() {
  // const [log, setlog] = useState([]);
  // const [status, setstatus] = useState("");

  // let param = useParams();
  // let navigate = useNavigate();
  // useEffect(() => {
  //   console.log(param);
  // }, []);
  return (
    <div className="newProduct">
      <h1 className="addProductTitle">Invoice</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Status</label>
          <select>
            <option>pending</option>
            <option>in progress</option>
            <option>delivering</option>
            <option>delivered</option>
            <option>failed</option>
          </select>
        </div>
        <div className="addProductItem ok">
          <label>Log</label>
            
          <div className="addProductButton">Update</div>
        </div>
      </form>
    </div>
  );
}
