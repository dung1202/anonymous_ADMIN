import React, { useEffect, useState } from "react";
import "./userList.css";
import { DataGrid } from "@mui/x-data-grid";
// import { Link } from "react-router-dom";
import { deleteuser, getuser } from "../../axios";
import { DeleteOutline } from "@material-ui/icons";
export default function UserList() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getuser().then((res) => {
      setUsers(res.data);
    });
  }, [users]);
  const deletedata = (id) => {
    deleteuser(id);
  };
  const columns = [
    { field: "_id", headerName: "ID", width: 220 },
    {
      field: "username",
      headerName: "Username",
      width: 350,
      renderCell: (params) => {
        return (
          <div className="userListItem">
            <img alt="" className="userListImg" src={params.row.photoUrl} />
            <div className="userListname">{params.row.username}</div>
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "phone",
      headerName: "Phone",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            {/* <Link to={"/user/" + params.row._id}>
              <button className="productListEdit">UUI</button>
            </Link> */}
            <DeleteOutline
              className="productListDelete"
              onClick={() => deletedata(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
      <DataGrid
        rows={users}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={9}
        // checkboxSelection
      />
    </div>
  );
}
