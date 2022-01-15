import React, { useState, useEffect } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// import ReactHtmlParser from 'react-html-parser';
import { storage } from "./uploadFireBase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getNewsById, updateNews } from "../../../axios";
import "../../news/richTextEditor/edit.css";
import { Publish } from "@material-ui/icons";

export default function EditorNews() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [value, setValue] = useState("");
  const param = useParams();
  const [linkAnh, setlinkAnh] = useState("");
  const [file, setfile] = useState("");
  useEffect(() => {
    console.log(param);
    let id = param.userId;
    getNewsById(id).then((res) => {
      console.log(res.data.data[0]);
      setEmail(res.data.data[0].title);
      setValue(res.data.data[0].content);
      setlinkAnh(res.data.data[0].image);
    });
  }, [param]);
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

  const handle2 = (e) => {
    const data = e.target.value;
    setEmail(data);
    console.log(data);
  };

  const submit = (e) => {
    e.preventDefault();
    const fromdata = new FormData();
    if (file) {
      fromdata.append("file", file, file.name);
    }
    fromdata.append("title", email);
    fromdata.append("content", value);

    updateNews(param.userId, fromdata)
      .then((res) => {
        navigate("/newsdashboards");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const upanh = (e) => {
    setfile(e.target.files[0]);
    const ok = e.target.files[0];
    console.log(ok);
    let storageRef = ref(storage, `anh/${ok.name}`);
    let uploadTask = uploadBytesResumable(storageRef, ok);
    uploadTask.on(
      (error) => console.log(error),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setlinkAnh(downloadURL);
        });
      }
    );
  };

  return (
    <div className="App1">
      <div className="container">
        <div className="wrapper">
          <form className="form-group">
            <h1>Edit News</h1>

            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                value={email}
                onChange={handle2}
                placeholder="Title"
                className="form-control"
              />
            </div>
            <div className="userUpdateUpload">
              <img alt="" className="userShowImg" src={linkAnh} />
              <label htmlFor="file">
                <Publish className="userUpdateIcon" />
              </label>
              <input
                type="file"
                id="file"
                style={{ display: "none" }}
                onChange={upanh}
              />
            </div>
            <div className="form-group">
              <label>Content</label>
              <CKEditor
                editor={ClassicEditor}
                data={value}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setValue(data);
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
            <Link to={"/newsdashboards"}>
              <button onClick={submit}>Update</button>
            </Link>
          </form>
        </div>
      </div>
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
