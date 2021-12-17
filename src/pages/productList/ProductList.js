import "./productlist.css";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@material-ui/icons";
import react, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProduct, deleteProduct } from "../../axios";

export default function ProductList() {
  const [data, setData] = useState(null);
  const [product, setProduct] = useState([]);
  const [time, setTime] = useState(0);
  setTimeout(() => {
    if (time < 3) setTime(time + 1);
    else setTime(0);
    console.log(time);
  }, 2000);
  useEffect(async () => {
    let result = await getProduct();
    setProduct(result.data);
  }, [product]);
  const deletedata = (id) => {
    deleteProduct(id);

    getProduct()
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        setData(null);
      });
  };
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
              className="productListImg"
              src={params.row.listphotos[time]}
              alt=""
            />
          </div>
        );
      },
    },
    { field: "name", headerName: "Name", width: 150, height: 100 },
    {
      field: "discountPrice",
      headerName: "DiscountPrice",
      width: 120,
      height: 100,
    },
    {
      field: "listedPrice",
      headerName: "Price",
      width: 120,
      height: 100,
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
            <input type="checkbox" readonly checked={params.row.is_hot}/>
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
            <input type="checkbox" readonly checked={params.row.in_slider}/>
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
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={9}
        // checkboxSelection
      />
    </div>
  );
}
