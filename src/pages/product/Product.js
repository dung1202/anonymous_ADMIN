import { Link } from "react-router-dom";
import "./product.css";
import { Publish } from "@material-ui/icons";
import React, { useEffect, useState } from 'react'
import { getProductid, updateproduct } from '../../axios'
import { Navigate, useParams, useLocation } from "react-router-dom";
import axios from "axios";
export default function Product() {
    const [name,setName] = useState('');
    const [listdPrice,setListdPrice] = useState('');
    const [file,setFile] = useState(null);
    const [filename,setFilename] = useState(null);
    const [quantity,setQuantity] = useState('');
    const [discountPrice,setDiscounPrice] =useState(false);
    const [ishot,setIshot]=useState(false);
    const [tags,setTags] =useState([])
    const [ description,setDescription] = useState([]);
    const param = useParams();
    const [id,setId] = useState(param.id)
    useEffect(() => {
      if (id) {
        getProductid(id).then(res => {
          let data = res.data
          setName(data.name)
          setQuantity(data.quantity)
          setIshot(data.ishot)
          setDescription(data.description)
          setDiscounPrice(data.discountPrice)
        })
  
      }
    }, [])
    const updatedata =() =>{
      let body = {
        id,
        name,
        listdPrice,
      }
      updateproduct(body).then(res=>{
        Navigate.push("/")
      })
    }
    const handFile =() =>{
      const formData = new FormData();
      for(let i = 0;i<file.length;i++)
      {
        formData.append("file",file[i],file[i].name);
      }
      console.log(formData.append);
    }
    const anh =() =>{

      
    }
    
  return (
    <div className="product">
  
   <div className="productUpdate">
          <span className="userUpdateTitle">Edit Product</span>
          <form className="productUpdateForm">
            <div className="productUpdateLeft">
            <div className="productUpdateUpload">
                <label htmlFor="file">
                  <Publish className="productUpdateIcon" />
                </label>
                <input type="file" multiple="multiple" onChange ={(e) => setFile(e.target.files)} accept="image/png, image/jpeg" />
              </div>
              <div className="productUpdateItem">
                <label className="producttext">Name Product</label>
                <input
                  type="text"
                  value={name} onChange={(e)=> setName(e.target.value)}
                  placeholder="Nameproduct"
                  className="productUpdateInput"
                />
              </div>
              <div className="productUpdateItem">
                <label className="producttext">ListedPrice</label>
                <input
                  type="text"
                  value={listdPrice} onChange={(e) => setListdPrice(e.target.value)}
                  placeholder="Price"
                  className="productUpdateInput"
                />
              </div>
              <div className="productUpdateItem">
                <label className="producttext">quantity</label>
                <input
                  type="number"
                  value={quantity} onChange={(e) => setQuantity(e.target.value)}
                  placeholder="Quantity"
                  className="productUpdateInput"
                />
              </div>
              <div className="productUpdateItem">
                <label className="producttext">Is_hot</label>
                <select name ="is_hot" id ="ishot">
                  <option value="true">true</option>
                  <option value="flase">false</option>
                </select>
              </div>
              <div className="productUpdateItem">
                <label className="producttext">discountPrice</label>
                <input
                  type="number"
                  value={discountPrice} onChange={(e) => setDiscounPrice(e.target.value)}
                  className="productUpdateInput"
                />
              </div>
              <div className="productUpdateItem">
                <label className="producttext"> Description</label>
                <input
                  type="text"
                  value={description} onChange={(e) =>setDescription(e.target.value)}
                  placeholder="description"
                  className="productUpdateInput"
                />
              </div>
            </div>
          
              
              <button className="productUpdateButton" onClick={updatedata}>Update</button>
          </form>
        </div>
          
    </div>
  );
}