import {
  Button,
  Divider,
  Input,
  InputNumber,
  Space,
  Typography,
  Form,
  message,
} from "antd";
import { useEffect, useState } from "react";
import API from "../api.js";
const { Title, Paragraph, Text, Link } = Typography;

function PhotoView(props) {
  let data = props.photoData;
  return (
    <div>
      <img src={data.download_url} style={{ maxWidth: "100%" }} />
      <p>
        Uploader: {data.uploader} <br />
        Attribution: {data.attribution} <br />
        Department: {data.department} <br />
        Date Taken: {data.dt_taken} <br />
        Caption: {data.caption} <br />
      </p>
    </div>
  );
}

export function PhotoViewer(props) {
  const [unlocked, setUnlocked] = useState([]);
  const [photosToView, setPhotosToView] = useState([]);
  const [selectedVolIssue, setSelectedVolIssue] = useState([]);

  useEffect(() => {
    setUnlocked(false);
    console.log(
      `got default volume ${props.defaultVolume} and issue ${props.defaultIssue}`
    );
    setSelectedVolIssue({
      volume: props.defaultVolume,
      issue: props.defaultIssue,
    });
  }, []);

  useEffect(() => {
    if (unlocked) {
      API.get("photos_by_issue", {
        params: {
          volume: selectedVolIssue.volume,
          issue: selectedVolIssue.issue,
        },
      }).then((data) => setPhotosToView(data));
    }
  }, [unlocked, selectedVolIssue]);

  if (!unlocked) {
    return (
      <div className="main-container">
        <Form
          name="viewer-password"
          onFinish={(data) => {
            // this is absolutely atrocious but there is also
            // nothing sensitive behind this password
            // just saving AWS bandwidth
            // but still TODO: have a slightly better auth system
            if (data.password == "techphoto") {
              setUnlocked(true);
            } else {
              message.error("Incorrect Password");
            }
          }}
        >
          <Form.Item label="Password" name="password">
            <Input.Password />
          </Form.Item>
        </Form>
      </div>
    );
  }

  if (photosToView.data && photosToView.data.length > 0) {
    var photoViews = photosToView["data"].map((photoInfo) => (
      <PhotoView photoData={photoInfo} />
    ));
  } else {
    var photoViews = <p>No Photos</p>;
  }

  return (
    <div className="main-container">
      <Typography>
        <Title>
          Photos for Volume {selectedVolIssue.volume} Issue{" "}
          {selectedVolIssue.issue}
        </Title>
      </Typography>
      <h1></h1>
      <Form
        name="select_issue"
        onFinish={(data) => {
          setSelectedVolIssue({
            volume: data.volume ? data.volume : selectedVolIssue.volume,
            issue: data.issue ? data.issue : selectedVolIssue.issue,
          });
        }}
      >
        <h2>Choose new issue</h2>
        <Space>
          <Form.Item label="Volume" name="volume">
            <InputNumber defaultValue={selectedVolIssue.volume} />
          </Form.Item>
          <Form.Item label="Issue" name="issue">
            <InputNumber defaultValue={selectedVolIssue.issue} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Go
            </Button>
          </Form.Item>
        </Space>
      </Form>
      {photoViews}
    </div>
  );
}
