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
import { PhotoSelector } from "./components/PhotoSelector"
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

  function handlePhotoSubmit(onSuccess, values) {
    console.log("submitted photo list to follow", photoList);
    console.log("and values", values);
    console.log("function to call on success", onSuccess);

    let apiPhotoList = photoList.map((photo, index) => ({
      ...values["photos"][index],
      uploader: values["uploader"],
      filename: photo.name,
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
        formData.append("file", photoList[index]);

        API.post(res.data["upload_url"].url, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }).then((upload_res) => {
          console.log("upload result");
          console.log(upload_res);
          message.success({ content: `Done uploading ${index + 1}/${photoList.length}!`, msg_key });
        });
      
      console.log("calling function to clear fields");
      onSuccess();
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
          console.log("adding photos. photoList is", photoList);
          setPhotoList(photoList.concat(photosToAdd));
          console.log("added", photosToAdd, "photo list is now", photoList);
        }}
        defaultVolume={props.defaultVolume}
        defaultIssue={props.defaultIssue}
        photoList={photoList}
        handlePhotoSubmit={handlePhotoSubmit}
      />
    </div>
  );
}

export default App;
