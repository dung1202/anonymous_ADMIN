import React, { useState, useEffect } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// import ReactHtmlParser from 'react-html-parser';
import { storage } from "./uploadFireBase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { Link, useNavigate } from "react-router-dom";
import { CreateNews } from "../../../axios";
import "../../news/richTextEditor/edit.css";
import { Publish } from "@material-ui/icons";

export default function Editor(props) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [value, setValue] = useState("");
  const [userName, setuserName] = useState("");
  const [userId, setuserId] = useState("");
  const [linkAnh, setlinkAnh] = useState("");
  const [file] = useState("");
  useEffect(() => {
    console.log(props.tt);
    setuserName(props.tt.userName);
    setuserId(props.tt._id);
  }, [props.tt]);
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
    fromdata.append("file", file, file.name);
    fromdata.append("creator_id", userId);
    fromdata.append("creator", userName);
    fromdata.append("title", email);
    fromdata.append("content", value);

    CreateNews(fromdata)
      .then((res) => {
        navigate("/newsdashboards");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const upanh = (e) => {
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
            <h1>Set up News</h1>

            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
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
              <button onClick={submit}>Submit</button>
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
