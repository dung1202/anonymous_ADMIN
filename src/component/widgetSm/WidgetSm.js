import "./widgetSm.css";
// import { Visibility } from "@material-ui/icons";
import { getuser } from "../../axios";
import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
export default function WidgetSm() {
  // let location = useLocation()
  // const [data, setData] = useState(null);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getuser().then((res) => {
      let mang = [];
      let ktr = 0;
      for (let i = res.data.length - 1; i >= 0; i--) {
        if (ktr <= 5) {
          mang.push(res.data[i]);
          ktr++;
        } else {
          setUsers(mang);
          console.log(mang);
          break;
        }
      }
    });
  }, []);
  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {users.map((user) => (
          <li className="widgetSmListItem" key={user._id}>
            <img alt="" src={user.photoUrl} className="widgetSmImg" />
            <div className="widgetSmUser">
              <span className="widgetSmUsername">{user.username}</span>
              <span className="widgetSmUserTitle">{user.email}</span>
            </div>
            {/* <button className="widgetSmButton">
              <Visibility className="widgetSmIcon" />
              Display
            </button> */}
          </li>
        ))}
      </ul>
    </div>
  );
}
