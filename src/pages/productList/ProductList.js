import "./productlist.css";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@material-ui/icons";
import CheckIcon from "@mui/icons-material/Check";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProduct, deleteProduct } from "../../axios";

export default function ProductList() {
  const [product, setProduct] = useState([]);
  const [time, setTime] = useState(0);
  setTimeout(() => {
    if (time < 3) setTime(time + 1);
    else setTime(0);
    console.log(time);
  }, 2000);
  useEffect(() => {
    getProduct().then((res) => {
      setProduct(res.data);
    });
  }, [product]);
  const deletedata = (id) => {
    deleteProduct(id);
  };

  const numberFormat = new Intl.NumberFormat(
    "vi-VN",
    {
      style: "currency",
      currency: "VND",
    } || undefined
  );
  const columns = [
    { field: "_id", headerName: "ID", width: 100, height: 100 },
    {
      field: "product",
      headerName: "Ảnh",
      width: 110,
      height: 100,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img
              alt=""
              className="productListImg"
              src={params.row.listphotos[time]}
            />
          </div>
        );
      },
    },
    { field: "name", headerName: "Name", width: 150, height: 100 },
    {
      field: "listedPrice",
      headerName: "Price",
      width: 120,
      height: 100,
      renderCell: (params) => {
        return <>{numberFormat.format(params.row.listedPrice)}</>;
      },
    },
    {
      field: "discountPrice",
      headerName: "DiscountPrice",
      width: 120,
      height: 100,
      renderCell: (params) => {
        return (
          <div style={{ color: "red" }}>
            {numberFormat.format(params.row.discountPrice)}
          </div>
        );
      },
    },

    {
      field: "quantity",
      headerName: "Quantity",
      width: 100,
      height: 100,
    },
    {
      field: "is_hot",
      headerName: "Hot",
      width: 100,
      height: 100,
      renderCell: (params) => {
        return (
          <>
            {params.row.is_hot ? <CheckIcon className="sidebarIcon" /> : null}
          </>
        );
      },
    },
    {
      field: "in_slider",
      headerName: "Slider",
      width: 100,
      height: 100,
      renderCell: (params) => {
        return (
          <>
            {params.row.in_slider ? (
              <CheckIcon className="sidebarIcon" />
            ) : null}
          </>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 120,
      height: 100,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/product/" + params.row._id}>
              <button className="productListEdit">Edit</button>
            </Link>
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
    <div className="productList">
      <DataGrid
        rows={product}
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={9}
        // checkboxSelection
      />
    </div>
  );
}
