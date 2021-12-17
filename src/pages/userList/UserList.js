import React, { useEffect, useState } from 'react'
import "./userList.css"
import { DataGrid } from "@mui/x-data-grid";
import { Link, useLocation } from 'react-router-dom'
import { deleteuser, getuser } from '../../axios'
import { DeleteOutline } from "@material-ui/icons";
export default function UserList() {
  const [data, setData] = useState(null)
  const [users, setUsers] = useState([])
  useEffect(async () => {
    let kq = await getuser()
    setUsers(kq.data)
  }, [users])
 const deletedata = (id) => {
    deleteuser(id)
    getuser().then(res => {
      setData(res.data)
    })
       .catch(err => {
        setData(null)
      })
  }
  const columns = [
    { field: "_id", headerName: "ID", width: 220 },
    {
      field: "username",
      headerName: "Username",
      width: 350,
      renderCell: (params) => {
        return (
          <div className="userListItem">
            <img className="userListImg" src={params.row.photoUrl} alt="" />
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
              <button className="productListEdit">Edit</button>
            </Link> */}
            <DeleteOutline
              className="productListDelete"
             onClick ={() => deletedata(params.row._id)}
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
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
  
 
 

}
