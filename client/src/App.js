import logo from "./logo.svg";
import API from "./api";
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
  Spin,
} from "antd";
import { PhotoViewer } from "./components/PhotoViewer.js";
import "./App.scss";

import { ImageWrapper } from "./components";

const { Title, Paragraph, Text, Link } = Typography;
const { Dragger } = Upload;

function App() {
  const [pageState, setPageState] = useState([]);

  useEffect(() => {
    setPageState("form");
  }, []);

  const [recentVolIssue, setRecentVolIssue] = useState([]);

  useEffect(() => {
    // get the volume and issue of the last photo uploaded
    API.get("photos", {
      params: {
        skip: 0,
        limit: 1,
      },
    }).then((res) => {
      if (res.data.length == 0) {
        setRecentVolIssue({
          volume: undefined,
          issue: undefined,
        });
        return;
      }

      console.log(res);
      setRecentVolIssue({
        volume: res.data[0].volume,
        issue: res.data[0].issue,
      });
      console.log("got most recent volume and issue");
      console.log(res.data[0].volume);
      console.log(res.data[0].issue);
    });
  }, []);

  if (pageState == "form") {
    return (
      <div className="main-container">
        <PhotoForm
          defaultVolume={recentVolIssue.volume}
          defaultIssue={recentVolIssue.issue}
        />
        <br />
        <a
          style={{
            opacity: "25%",
          }}
          onClick={() => {
            setPageState("view");
            console.log("clicked");
            console.log(pageState);
          }}
        >
          view all photos
        </a>
      </div>
    );
  }

  if (pageState == "view") {
    return (
      <div className="main-container">
        <PhotoViewer
          defaultVolume={recentVolIssue.volume}
          defaultIssue={recentVolIssue.issue}
        />
      </div>
    );
  }

  return (
    <div className="main-container">
      <Spin size="large" />
    </div>
  );
}

function PhotoForm(props) {
  // start our list of photos empty - this is a FileList
  const [photoList, setPhotoList] = useState([]); // we'll update as new photos are added
  const [uploaderKerb, setUploaderKerb] = useState([]);

  function handlePhotoSubmit() {
    console.log("submitted photo list to follow");
    console.log(photoList);

    let apiPhotoList = photoList.map((photoInfo, index) => ({
      ...photoInfo["info"],
      uploader: uploaderKerb,
      filename: photoInfo["file"].name,
    }));
    console.log(apiPhotoList);

    apiPhotoList.forEach((item, index) => {
      const msg_key = "uploading_msg";
      message.loading({
        content: `Uploading Photo ${index + 1}/${photoList.length}`,
        msg_key,
      });
      API.post("create_photo", item).then((res) => {
        console.log("post result");
        console.log(res);

        let formData = new FormData();
        for (var key in res.data["upload_url"].fields) {
          formData.append(key, res.data["upload_url"].fields[key]);
        }
        formData.append("file", photoList[index]["file"]);

        API.post(res.data["upload_url"].url, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }).then((upload_res) => {
          console.log("upload result");
          console.log(upload_res);
          message.success({ content: "Done uploading!", msg_key });
        });

        setPhotoList([]);

        //   {
        //   method: "post",
        //   url: res.data["upload_url"].url,
        //   data: formData,
        // });
      });
    });
    // API.post("photos").then((res) => {
    //   console.log("all photos:");
    //   console.log(res);
    // });
  }

  let imageForms = photoList.map((photoInfo, index) => (
    <ImageWrapper
      file={photoInfo.file}
      key={index}
      itemNum={index + 1}
      defaultVolume={props.defaultVolume}
      defaultIssue={props.defaultIssue}
      handleUpdate={(formData) => {
        console.log(
          `Saw update to form in item ${index + 1}: ${JSON.stringify(formData)}`
        );
        // this is updating the photoList state
        let newPhotosList = [...photoList];
        newPhotosList[index].info = formData;
        setPhotoList(newPhotosList);
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
        handleKerbChange={(uploaderKerb) => {
          setUploaderKerb(uploaderKerb);
        }}
      />

      {/* show image forms for each image */}
      {imageForms}
      <Divider />
      {/* maybe it would be better to have one button for each one?
          then we don't have to parse this grossness */}
      <Button type="primary" onClick={handlePhotoSubmit}>
        {`Submit ${photoList.length} Photo${photoList.length != 1 ? "s" : ""}`}
      </Button>
    </div>
  );
}

function PhotoSelector(props) {
  return (
    <div className="photo-selector">
      <Form>
        <Form.Item label="Your Kerberos">
          <Input
            placeholder="kerb"
            rules={[{ required: true }]}
            onChange={(data) => {
              props.handleKerbChange(data.target.value);
            }}
          />
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
