import React, { useState, useEffect } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import ReactHtmlParser from 'react-html-parser';
import { storage } from './uploadFireBase';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { Link, useParams } from "react-router-dom";
import { getNewsById, updateNews } from "../../../axios"
import "../../news/richTextEditor/edit.css"

export default function EditorNews() {
  const [email, setEmail] = useState("");
  const [value, setValue] = useState("");
  const param = useParams();
  useEffect(() => {
    console.log(param);
    let id = param.userId
    getNewsById(id).then((res) => {
      console.log(res.data.data[0]);
      setEmail(res.data.data[0].title)
      setValue(res.data.data[0].content)
    })
  }, [])
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
    updateNews(param.userId, body, auth).then((res) => {
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
            <h1>Edit News</h1>

            <div className="form-group">
              <label>Title</label>
              <input type="text" value={email} onChange={handle2} placeholder="Title" className="form-control" />
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
              <button onClick={submit}>Update</button>
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
