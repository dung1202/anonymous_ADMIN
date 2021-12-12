import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import ReactHtmlParser from 'react-html-parser';
import { storage } from './uploadFireBase';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { Link } from "react-router-dom";
import { CreateNews } from "../../../axios"
import "../../news/richTextEditor/edit.css"

export default function Editor() {
  const [email, setEmail] = useState("");
  const [value, setValue] = useState("");

  const custom_config = {
    extraPlugins: [MyCustomUploadAdapterPlugin],
    toolbar: {
      items: [
        'heading',
        '|',
        'bold',
        'italic',
        'link',
        'bulletedList',
        'numberedList',
        '|',
        'blockQuote',
        'insertTable',
        '|',
        'imageUpload',
        'undo',
        'redo'
      ]
    },
    table: {
      contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells']
    }
  }

  const handle2 = (e) => {
    const data = e.target.value;
    setEmail(data)
    console.log(data);
  };


  const submit = (e) => {
    e.preventDefault()
    const body = {
      creator_id: "61ab8be33451682f8101abfe",
      creator: "minhquang3",
      title: email,
      content: value
    }

    const auth = {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWFiOGJlMzM0NTE2ODJmODEwMWFiZmUiLCJpYXQiOjE2Mzg2MzI5NjcsImV4cCI6MTYzODY0MDE2N30.eedGh38m5CsKfIgPuXUXp15Gl6VFkiq7PCqFsntSHX8",
      },
    }
    console.log(body);
    CreateNews(body, auth).then((res) => {
      console.log("ok");
    }).catch((err) => {
      console.log(err);
    });

  }


  return (
    <div className="App">
      <div className="container">
        <div className="wrapper">
          <form className="form-group">
            <h1>Set up News</h1>

            <div className="form-group">
              <label>Title</label>
              <input type="text" onChange={handle2} placeholder="Title" className="form-control" />
            </div>
            <div className="form-group">
              <label>Content</label>
              <CKEditor
                editor={ClassicEditor}
                data={value}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setValue(data)
                  console.log(data);
                }}
                config={custom_config}
                onBlur={(event, editor) => {
                  console.log('Blur.', editor);
                }}
                onFocus={(event, editor) => {
                  console.log('Focus.', editor);
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
  editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
    return new MyUploadAdapter(loader)
  }
}



class MyUploadAdapter {
  constructor(loader) {
    console.log(loader);
    this.loader = loader;
  }
  // Starts the upload process.
  upload() {
    return this.loader.file.then(
      file =>
        new Promise((resolve, reject) => {
          let storageRef = ref(storage, `files/${file.name}`);
          let uploadTask = uploadBytesResumable(storageRef, file);
          uploadTask.on(
            (error) => console.log(error),
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                resolve({
                  default: downloadURL
                });
              });
            }
          );
        })
    );
  }
}











