import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";
import { getuser } from "../../axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
export default function WidgetSm() {
  // let location = useLocation()
  // const [data, setData] = useState(null);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getuser().then((res) => {
      setUsers(res.data);
      console.log(res.data);
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
              <span className="widgetSmUsername">
                <Link to={"/user/" + user._id}>{user.username}</Link>
              </span>
              <span className="widgetSmUserTitle">{user.email}</span>
            </div>
            <button className="widgetSmButton">
              <Visibility className="widgetSmIcon" />
              Display
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
