import "./newproduct.css";
import { useParams, useNavigate } from "react-router-dom";
import { createproduct } from "../../axios";
import React, { useEffect, useState } from "react";

export default function NewProduct() {
  const [file, setFile] = useState([]);
  const [name, setName] = useState("");
  const [listedPrice, setListedPrice] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");
  const [is_hot, setIs_hot] = useState(false);
  const [in_slider, setIn_slider] = useState(false);
  const [quantity, setQuantity] = useState("");
  const [vote, setvote] = useState("");
  const [description, setDescription] = useState();
  const [supplier, setsupplier] = useState("");
  const [tags, setTags] = useState([]);
  const [err, seterr] = useState("");

  let navigate = useNavigate();
  const changeFile = (e) => {
    console.log(e.target.files);
    setFile(e.target.files);
  };

  const wewe = () => {
    const formData = new FormData();
    console.log(file.length);
    if (file.length > 0) {
      for (let i = 0; i < file.length; i++) {
        formData.append("file", file[i], file[i].name);
      }
      formData.append("name", name);
      formData.append("listedPrice", listedPrice);
      formData.append("is_hot", is_hot);
      formData.append("discountPrice", discountPrice);
      formData.append("quantity", quantity);
      formData.append("in_slider", in_slider);
      formData.append("vote", vote);
      formData.append("sold", 0);
      formData.append("description", description);
      formData.append("supplier", supplier);
      formData.append("tags", tags);
      createproduct(formData).then(() => {
        console.log("ok");
        navigate("/products");
      });
      seterr("");
    } else {
      seterr("Thiếu ảnh");
    }
  };
  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Image</label>
          <input
            type="file"
            onChange={changeFile}
            accept="image/png, image/jpeg"
            multiple="multiple"
          />
        </div>
        <div className="addProductItem">
          <label>Name</label>
          <input
            type="text"
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="addProductItem">
          <label>Price</label>
          <input
            type="number"
            placeholder="123"
            value={listedPrice}
            onChange={(e) => setListedPrice(e.target.value)}
          />
        </div>
        <div className="addProductItem">
          <label>DiscountPrice</label>
          <input
            type="number"
            placeholder="123"
            value={discountPrice}
            onChange={(e) => setDiscountPrice(e.target.value)}
          />
        </div>
        <div className="addProductItem">
          <label>Quantity</label>
          <input
            type="number"
            placeholder="123"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>
        <div className="addProductItem">
          <label>Is Hot</label>
          <select
            name="active"
            id="active"
            value={is_hot}
            onChange={(e) => setIs_hot(e.target.value)}
          >
            <option value={false}>false</option>
            <option value={true}>true</option>
          </select>
        </div>
        <div className="addProductItem">
          <label>In Slider</label>
          <select
            name="active"
            id="active"
            value={in_slider}
            onChange={(e) => setIn_slider(e.target.value)}
          >
            <option value={false}>false</option>
            <option value={true}>true</option>
          </select>
        </div>
        <div className="addProductItem">
          <label>Vote</label>
          <input
            type="number"
            placeholder="123"
            value={vote}
            onChange={(e) => setvote(e.target.value)}
          />
        </div>
        <div className="addProductItem">
          <label>Supplier</label>
          <input
            type="text"
            placeholder="Supplier"
            value={supplier}
            onChange={(e) => setsupplier(e.target.value)}
          />
        </div>
        <div className="addProductItem">
          <label>Hashtag</label>
          <input
            type="text"
            placeholder="Hashtag"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <textarea
            className="textarea"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
        </div>
        <div onClick={wewe}>
          <div className="addProductButton">Create</div>
          <div className="err">{err}</div>
        </div>
      </form>
    </div>
  );
}
