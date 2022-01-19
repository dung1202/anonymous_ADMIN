import React, { useEffect, useState } from "react";
import "../userList/userList.css";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { getInvoice, getuser } from "../../axios";
// import { DeleteOutline } from "@material-ui/icons";
export default function InvoiceList(props) {
  const [users, setUsers] = useState([]);
  const [list, setlist] = useState([]);
  const [tt, settt] = useState("");
  const navigation = useNavigate();
  useEffect(() => {
    getInvoice("/invoice/auth/get?page=1").then((res) => {
      console.log(res.data.data);
      setUsers(res.data.data);
      settt(res.data);
      // setdai(res.data.data.length);
    });
    getuser().then((res) => {
      setlist(res.data);
    });
  }, []);
  const numberFormat = new Intl.NumberFormat(
    "vi-VN",
    {
      style: "currency",
      currency: "VND",
    } || undefined
  );
  const columns = [
    { field: "_id", headerName: "ID", width: 100 },
    {
      field: "username",
      headerName: "Username",
      width: 350,
      renderCell: (params) => {
        let ten = "";
        for (let i = 0; i < list.length; i++) {
          if (list[i]._id === params.row.user_id) {
            ten = list[i];
          }
        }
        return (
          <div className="userListItem">
            <img alt="" className="userListImg" src={ten.photoUrl} />
            <div className="userListname">{ten.username}</div>
          </div>
        );
      },
    },
    {
      field: "totalListPrice",
      headerName: "List Price",
      width: 150,
      renderCell: (params) => {
        return <>{numberFormat.format(params.row.totalListPrice)}</>;
      },
    },
    {
      field: "totalDiscountPrice",
      headerName: "Discount Price",
      width: 150,
      renderCell: (params) => {
        return <>{numberFormat.format(params.row.totalDiscountPrice)}</>;
      },
    },
    {
      field: "status",
      headerName: "status",
      width: 150,

      // renderCell: (params) => {
      //   return <>{numberFormat.format(params.row.totalDiscountPrice)}</>;
      // },
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <div
              onClick={() => {
                props.chuyen(params.row);
                navigation("/invoiceDetail");
              }}
            >
              <button className="productListEdit">Change</button>
            </div>
            {/* <DeleteOutline className="productListDelete" /> */}
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
        rowCount={tt.totalMatch}
        getRowId={(row) => row._id}
        pageSize={10}
        // checkboxSelection
        onPageChange={(page) => {
          // let mang = [];
          console.log(page);
          // if ((page + 1) * 10 > users.length)
          getInvoice(`/invoice/auth/get?page=${page + 1}`).then((res) => {
            setUsers(users.concat(res.data.data));
            console.log(users);
          });
        }}
      />
    </div>
  );
}
