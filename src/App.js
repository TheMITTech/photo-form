import logo from "./logo.svg";
import React, { useEffect, useState } from "react";
import {
  Typography,
  Upload,
  message,
  Form,
  Input,
  Button,
  Select,
  Divider,
} from "antd";
import "./App.scss";

import { ImageWrapper } from "./components";

const { Title, Paragraph, Text, Link } = Typography;
const { Dragger } = Upload;

function App() {
  return (
    <div className="main-container">
      <PhotoForm />
    </div>
  );
}

function PhotoForm() {
  // start our list of photos empty - this is a FileList
  const [photoList, setPhotoList] = useState([]); // we'll update as new photos are added

  function handlePhotoSubmit() {
    console.log("submitted photo list to follow");
    console.log(photoList);
    alert(`submitting ${JSON.stringify(photoList)}`);
  }

  let imageForms = photoList.map((photoInfo, index) => (
    <ImageWrapper
      file={photoInfo.file}
      key={index}
      itemNum={index + 1}
      handleUpdate={(formData) => {
        console.log(
          `Saw update to form in item ${index + 1}: ${JSON.stringify(formData)}`
        );
        let newPhotosList = [...photoList];
        newPhotosList[index].info = formData;
      }}
    />
  ));

  return (
    <div className="photo-form">
      <Typography>
        <Title>The Tech Photo Upload Form</Title>
        <Paragraph>
          This site is meant to make the process of uploading photos simpler.
        </Paragraph>
        <Paragraph>
          The current file list is {JSON.stringify(photoList)}
        </Paragraph>
      </Typography>
      <PhotoSelector
        addPhotos={(photosToAdd) => {
          // add an object with info and the file object for each photo
          let photoInfoList = photosToAdd.map((file) => ({
            file: file,
            info: {},
          }));
          setPhotoList(photoList.concat(photoInfoList));
        }}
      />

      {/* show image forms for each image */}
      {imageForms}
      <Divider />
      {/* maybe it would be better to have one button for each one?
          then we don't have to parse this grossness */}
      <Button type="primary" onClick={handlePhotoSubmit}>
        Submit Photos
      </Button>
    </div>
  );
}

function PhotoSelector(props) {
  return (
    <div className="photo-selector">
      <Form>
        <Form.Item label="Your Kerberos">
          <Input placeholder="kerb" />
        </Form.Item>
        <Form.Item>
          <Dragger
            name="file"
            accept="image/png, image/jpeg"
            multiple={true}
            showUploadList={false}
            beforeUpload={(file, fileList) => {
              props.addPhotos(fileList);
              return false;
            }}
          >
            Drag or click to upload files. Please upload JPEG files.
          </Dragger>
        </Form.Item>
      </Form>
    </div>
  );
}

// class PhotoSelector extends React.Component {
//   constructor(props) {
//     super(props);
//     this.handleSubmit = this.handleSubmit.bind(this);
//     this.fileInput = React.createRef();
//   }

//   handleImageChange(event) {
//     this.props.updatePhotoList(event.target.files);
//   }

//   handleSubmit(event) {
//     event.preventDefault();
//     let fileArray = Array.from(this.fileInput.current.files);
//     let fileString = fileArray.map((file) => file.name).join("\n");
//     alert(
//       `Selected ${fileArray.length} file${
//         fileArray.length > 1 ? "s" : ""
//       }:\n ${fileString}`
//     );
//   }

//   render() {
//     return (
//       <input
//         type="file"
//         onChange={this.handleImageChange}
//         ref={this.fileInput}
//         multiple
//       />
//     );
//   }
// }

export default App;
