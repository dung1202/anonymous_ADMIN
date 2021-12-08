import { Link } from "react-router-dom";
import "./product.css";
import { Publish } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { getProductid, updateproduct } from "../../axios";
import { useNavigate, useParams } from "react-router-dom";
export default function Product() {
  const [name, setName] = useState("");
  const [listedPrice, setListedPrice] = useState("");
  const [file, setFile] = useState([]);
  const [quantity, setQuantity] = useState("");
  const [in_slider, setIn_slider] = useState(false);
  const [discountPrice, setDiscountPrice] = useState(false);
  const [is_hot, setIs_hot] = useState(false);
  const [supplier, setsupplier] = useState("");
  const [tags, setTags] = useState([]);
  const [description, setDescription] = useState();
  const [vote, setvote] = useState("");
  const param = useParams();
  const navigate = useNavigate();
  console.log(param);
  const [id] = useState(param.productId);
  const changeFile = (e) => {
    console.log(e.target.files);
    setFile(e.target.files);
  };

  useEffect(() => {
    if (id) {
      getProductid(id).then((res) => {
        let data = res.data;
        setListedPrice(data.listedPrice);
        setName(data.name);
        setQuantity(data.quantity);
        setIs_hot(data.is_hot);
        setIn_slider(data.in_slider);
        setDescription(data.description);
        setDiscountPrice(data.discountPrice);
        setvote(data.vote);
        setTags(data.tags.join(" "));
        setsupplier(data.supplier);
      });
    }
  }, [id]);
  const wewe = () => {
    const formData = new FormData();
    if (file.length > 0) {
      for (let i = 0; i < file.length; i++) {
        formData.append("file", file[i], file[i].name);
      }
    }
    formData.append("name", name);
    formData.append("listedPrice", listedPrice);
    formData.append("is_hot", is_hot);
    formData.append("discountPrice", discountPrice);
    formData.append("quantity", quantity);
    formData.append("in_slider", in_slider);
    formData.append("vote", vote);
    formData.append("description", description);
    formData.append("supplier", supplier);
    formData.append("tags", tags);
    console.log(in_slider);
    updateproduct(id, formData).then(() => {
      console.log("ok");
      navigate("/products");
    });
  };

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">Update Product</h1>
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
        <div className="addProductButton" onClick={wewe}>
          Update
        </div>
      </form>
    </div>
  );
}
