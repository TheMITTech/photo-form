import React, { useEffect, useState } from "react";
import EXIF from "exif-js"; // for reading image data
import * as dayjs from "dayjs";
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
import { DatePicker } from "../components";
const { Title, Paragraph, Text, Link } = Typography;
const { Option } = Select;

/* ImagePreviewer
 * One of these will be created for each image the user uploads.
 * It will allow the user to set attributes for the image
 *
 * props:
 * itemNum: the number assigned to this image (1,2,3, etc)
 * file: a js File object, the file that we're dealing with now
 * handleUpdate(formData): the function to handle updates to the form data
 * NOT YET: updateRemaining(formData): the function to update the remaining items with entered data
 */
function ImageForm(props) {
  const [imgForm] = Form.useForm();
  var imgDate = dayjs(props.imgInfo["date"]);
  console.log(imgDate);
  console.log(dayjs("2019-11-10T03:53:31-05:00"));
  return (
    <div className="image-info-form-container">
      <Divider />
      <Title level={2}>
        Image {props.itemNum}: {props.file.name}
      </Title>
      <img src={URL.createObjectURL(props.file)} className="image-preview" />
      <Form
        form={imgForm}
        onFieldsChange={(changedFields, allFields) =>
          props.handleUpdate(allFields)
        }
      >
        <Form.Item label="Event/Topic" name="event">
          <Input placeholder="Men's Soccer vs. WPI" />
        </Form.Item>
        <Form.Item label="Department" name="department">
          <Select placeholder="Select">
            <Option value="spo">SPO</Option>
            <Option value="fto">FTO</Option>
            <Option value="rtz">RTZ</Option>
            <Option value="cl">CL</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Date/Time Taken (from EXIF if available)"
          name="datetime"
        >
          <DatePicker
            defaultValue={imgDate.isValid() ? imgDate : undefined}
            key={imgDate} // necessary to ensure DatePicker re-renders when date found
            showTime={true}
            disabled={imgDate.isValid()}
          />
        </Form.Item>
        <Form.Item label="Caption" name="caption">
          <Input.TextArea placeholder="See the wiki for how to write a good caption" />
        </Form.Item>
        <Form.Item label="Attribution (if not yourself)" name="attribution">
          <Input placeholder="Photo Provided by Dance Troupe" />
        </Form.Item>
        {/* <Button
          type="link"
          htmlType="button"
          onClick={() =>
            alert(
              `filling others! ${JSON.stringify(imgForm.getFieldsValue(true))}`
            )
          }
        >
          copy inputs to remaining images
        </Button> */}
      </Form>
    </div>
  );
}

/* ImageWrapper
 * Parses the exif data of the image and renders the ImageForm
 */
export default function ImageWrapper(props) {
  const [imgExifData, setExifData] = useState({});
  const [imgDate, setImgDate] = useState(null);

  function parseEXIFDate(exifDate) {
    // parses a date in EXIF string format and returns a Date
    var b = exifDate.split(/\D/); // split date string on any non-digit char (regex)
    var d = new Date(b[0], b[1] - 1, b[2], b[3], b[4], b[5]);
    return d;
  }

  useEffect(() => {
    EXIF.getData(props.file, function () {
      var exifDate = EXIF.getTag(this, "DateTimeOriginal");

      if (exifDate !== undefined) setImgDate(parseEXIFDate(exifDate));
      else setImgDate(null);

      // var exifData = EXIF.getAllTags(this);
      // if (exifData) {
      //   setExifData(exifData);
      //   console.log(`Image Date: ${EXIF.getTag(this, "DateTimeOriginal")}`);
      // } else {
      //   console.log("No EXIF data found in image '" + props.file.name + "'.");
      // }
    });
  }, [props.file]);

  return (
    <ImageForm
      {...props}
      imgInfo={{
        date: imgDate,
      }}
    />
  );
}
