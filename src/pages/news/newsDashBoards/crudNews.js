import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import "../../news/newsDashBoards/crudNew.css";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Link } from "react-router-dom";
import { getNews } from "../../../axios"
// import { async } from '@firebase/util';
// import { deleteNews } from '../../axios';

export default function CrudNews() {
  const [data, setData] = useState([])
  const [trang, setTrang] = useState(0)


  useEffect(() => {
    let mang = []
    getNews(1).then((res) => {
      setTrang(res.data)
      res.data.data.map((item) => {
        let obj = {
          id: item._id,
          title: item.title,
          link: `https://voucherhunter-6876c.web.app/news/${item._id}`
        }
        mang.push(obj)
        return <div></div>
      })
      setData(mang)
    })
  }, [])

  

  


  const handleDelete = (id) => {
    // deleteNews(id).then((res) => {
    //   console.log(res.data.data[0]);
    //   setData()
    // })
    setData(data.filter(item => item.id !== id));
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 220 },
    { field: 'title', headerName: 'Title', width: 400 },
    { field: 'link', headerName: 'Link', width: 450 },
    {
      field: 'action', headerName: 'Action', width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/editor/" + params.row.id}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutlineIcon className="userListDelete"
              onClick={() => handleDelete(params.row.id)} />
          </>
        );
      },
    },
  ];
  return (
    <div style={{ height: 700, width: '100%' }}>
      <Link to={"/editor/"}>
        <button className="userListEdit">Set Up News</button>
      </Link>
      <DataGrid rows={data} columns={columns} disableSelectionOnClick rowCount={trang.totalNews} pageSize={10} rowsPerPageOptions={[50]} checkboxSelection
        onPageChange={(page) => {
          let mang = []
          getNews(page + 1).then(async (res) => {
            await res.data.data.map((item) => {
              let obj = {
                id: item._id,
                title: item.title,
                link: `https://voucherhunter-6876c.web.app/news/${item._id}`
              }
              mang.push(obj)
              return <div></div>
            })
            if ((page + 1) * 10 > data.length)
              setData(data.concat(mang))
          })
        }}
      />
    </div>
  );
}

