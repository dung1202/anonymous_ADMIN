import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { storage } from "./../news/richTextEditor/uploadFireBase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { sendNewsletter } from "../../axios";
import "./Newsletter.css";

export default function Newsletter() {
  const [description, setDescription] = useState("");
  const [note, setnote] = useState("");
  const wewe = () => {
    if (description) {
      let body = {
        content: description,
      };
      sendNewsletter(body)
        .then((res) => {
          console.log(res.data);
          setnote("Send newsletter successfully");
        })
        // .catch((err) => {
        //   console.log(err);
        // });
    } else {
      setnote("empty");
    }
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
  return (
    <div className="newProduct">
      <h1 className="addProductTitle">Newsletter</h1>
      <form className="addProductForm">
        <div className="addProductItem ok">
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
          <div style={{ color: "red" }}>{note}</div>
        </div>

        <div className="addProductButton" onClick={wewe}>
          Send
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
