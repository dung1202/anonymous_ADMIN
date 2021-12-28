import "./newproduct.css";
import { useNavigate } from "react-router-dom";
import { createproduct } from "../../axios";
import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { storage } from "../news/richTextEditor/uploadFireBase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

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

  const custom_config = {
    extraPlugins: [MyCustomUploadAdapterPlugin],
    toolbar: {
      items: [
        "heading",
        "|",
        "bold",
        "italic",
        "link",
        "bulletedList",
        "numberedList",
        "|",
        "blockQuote",
        "insertTable",
        "|",
        "imageUpload",
        "undo",
        "redo",
      ],
    },
    table: {
      contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"],
    },
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
          <label>Is Hot</label>
          <input
            type="checkbox"
            checked={is_hot}
            onChange={() => {
              setIs_hot(!is_hot);
            }}
          />
        </div>
        <div className="addProductItem">
          <label>In Slider</label>
          <input
            type="checkbox"
            checked={in_slider}
            onChange={() => {
              setIn_slider(!in_slider);
            }}
          />
        </div>
        <div className="addProductItem ok">
          <label>Description</label>
          <CKEditor
            editor={ClassicEditor}
            data={description}
            onChange={(event, editor) => {
              const data = editor.getData();
              setDescription(data);
              console.log(data);
            }}
            config={custom_config}
            onBlur={(event, editor) => {
              console.log("Blur.", editor);
            }}
            onFocus={(event, editor) => {
              console.log("Focus.", editor);
            }}
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

function MyCustomUploadAdapterPlugin(editor) {
  editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
    return new MyUploadAdapter(loader);
  };
}

class MyUploadAdapter {
  constructor(loader) {
    console.log(loader);
    this.loader = loader;
  }
  // Starts the upload process.
  upload() {
    return this.loader.file.then(
      (file) =>
        new Promise((resolve, reject) => {
          let storageRef = ref(storage, `files/${file.name}`);
          let uploadTask = uploadBytesResumable(storageRef, file);
          uploadTask.on(
            (error) => console.log(error),
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                resolve({
                  default: downloadURL,
                });
              });
            }
          );
        })
    );
  }
}
