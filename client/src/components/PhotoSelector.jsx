import React, { useEffect, useState } from "react";
import EXIF from "exif-js"; // for reading image data
import dayjs from "dayjs";
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
  Space,
  InputNumber
} from "antd";

import { DatePicker } from "../components";
import { isConstructorDeclaration, reduceEachTrailingCommentRange } from "typescript";
const { Title, Paragraph, Text, Link } = Typography;
const { Dragger } = Upload;
const { Option } = Select;

/**
 * converts the date from EXIF string format to JS date format
 * @param {String} exifDate 
 * @returns {Date}
 */
function parseEXIFDate(exifDate) {
var b = exifDate.split(/\D/); // split date string on any non-digit char (regex)
var d = new Date(b[0], b[1] - 1, b[2], b[3], b[4], b[5]);
return d;
}

/**
 * updates the date for the photo at the given index
 * @param {Date} date 
 * @param {BigInt} index 
 * @param {FormInstance} form the form to update, from Form.useForm()
 */
function updatePhotoDate(date, index, form) {
    const fields = form.getFieldsValue();
    console.log("fields are", fields, "date is", date);
    const {photos} = fields;
    Object.assign(photos[index], {dt_taken: dayjs(date)});
    console.log("updating date at index", index, "fields were", fields, "assigning to", {photos})
    form.setFieldsValue({photos});
}

export function PhotoSelector(props) {
    const [form] = Form.useForm();
    var formRemoveMethod;
    const [exifShouldRun, setExifShouldRun] = useState();

    useEffect(() => {
        if (!exifShouldRun)
            return;
        const fields = form.getFieldsValue();
        form.getFieldInstance()
    
        console.log("fields length changed!, fields are", fields);
        if (fields["photos"] == undefined)
            return;
        const {photos} = fields;
        photos.map((photo, index) => {
            if (index > props.photoList.length)
                return;
            if (!fields["photos"][index])
                return;
            EXIF.getData(props.photoList[index], function () { // TODO: wrap in a promise to serialize. for now, no exif
                var exifDate = EXIF.getTag(this, "DateTimeOriginal");
                console.log("got exif date for image", exifDate, "applying to index", index);
                if (exifDate !== undefined) updatePhotoDate(parseEXIFDate(exifDate), index, form);
            });
        })
        setExifShouldRun(false);
    }, [form.getFieldsValue()["photos"] !== undefined ? form.getFieldsValue()["photos"].length : null]);

    return (
    <div className="photo-selector">
      <Form
        name="photo-upload-form"
        onFinish = {(values) =>
            props.handlePhotoSubmit(() => {
                // form.resetFields();
                values["photos"].map(() => formRemoveMethod(0));
            }, values )
        }
        form={form}
      >
        <Form.Item 
            label="Your Kerberos"
            name="uploader"
            rules={[{ required: true, message: "Kerberos is required"}]}
        >
          <Input
            placeholder="kerb"
          />
        </Form.Item>
        <Form.List name="photos">
            {(fields, { add, remove }) => {
                formRemoveMethod = (key) => remove(key);
                return (
                <>
                {fields.map((field, index) => {
                    var imgFile = props.photoList[field.key];
                    console.log("image for key", field.key, "is", imgFile)
                    if (imgFile) return (
                    <div className="image-info-form-container" key={index}>
                        <Divider />
                        <Title level={2}>
                            Image {field.key + 1}: {imgFile.name}
                        </Title>
                        <img src={URL.createObjectURL(imgFile)} className="image-preview" />
                        <Form.Item 
                            label="Event/Topic"
                            name={[field.key, 'event_name']}
                            rules={[{ required: true, message: "Event name is required" }]}
                        >
                        <Input placeholder="Men's Soccer vs. WPI" />
                        </Form.Item>
                        <Space>
                        <Form.Item 
                            label="Department" 
                            name={[field.key, "department"]} 
                            initialValue="fto"
                            rules={[{ required: true, message:"Department is required"}]}
                        >
                            <Select placeholder="Select">
                            <Option value="spo">SPO</Option>
                            <Option value="fto">FTO</Option>
                            <Option value="rtz">RTZ</Option>
                            <Option value="cl">CL</Option>
                            <Option value="sci">SCI</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label="Volume" 
                            name={[field.key, "volume"]} 
                            rules={[{ required: true, message: "Volume # is required" }]}
                            initialValue={props.defaultVolume}
                        >
                            <InputNumber/>
                        </Form.Item>
                        <Form.Item
                            label="Issue"
                            name={[field.key, "issue"]}
                            rules={[{ required: true, message: "Issue # is required" }]}
                            initialValue={props.defaultIssue}
                        >
                            <InputNumber/>
                        </Form.Item>
                        </Space>
                        <Form.Item
                            label="Date/Time Taken (autofilled from EXIF if available)"
                            name={[field.key, "dt_taken"]}
                            // initialValue={imgDate.isValid() ? imgDate : undefined}
                            rules={[{ required: true, message: "Date/Time is required" }]}
                        >
                        <DatePicker
                            // key={imgDate} // necessary to ensure DatePicker re-renders when date found
                            showTime={true}
                            // disabled={imgDate.isValid()}
                        />
                        </Form.Item>
                        <Form.Item 
                            label="Caption"
                            name={[field.key, "caption"]}
                            rules={[{ required: true, message: "Caption is required" }]} 
                        >
                        <Input.TextArea placeholder="See the wiki for how to write a good caption" />
                        </Form.Item>
                        <Form.Item
                            label="Attribution (or your full name)"
                            name={[field.key, "attribution"]}
                            rules={[{ required: true, message: "Attribution is required" }]}
                        >
                        <Input placeholder="Photo Provided by Dance Troupe" />
                        </Form.Item>
                    </div>
                    )
                    else return (
                        <div className="image-info-form-container">
                            <Divider />
                            <Spin />
                            <Divider />
                        </div>
                    )
                })}

                <Form.Item>
                
                <Divider />
                <Dragger
                    name="file"
                    accept="image/png, image/jpeg"
                    multiple={true}
                    showUploadList={false}
                    beforeUpload={(file, fileList) => {
                        // we add the photo info to a global list,
                        // and create fields to correspond in the form.
                        // the indices will align. This is a bit messy,
                        // but I cannot think of a better way.
                        props.addPhotos(fileList); // TODO: I don't think this really needs to be in the parent
                        add();
                        setExifShouldRun(true);
                        console.log("beforeUpload called for file", file, "fields are now", fields);
                        return false;
                    }}
                >
                    Click or drag to upload files. Please upload JPEG files.
                </Dragger>
                </Form.Item>
                </>
                )}
            }
        </Form.List>
        <Button type="submit" htmlType="submit">
            {`Submit ${props.photoList.length} Photo${props.photoList.length != 1 ? "s" : ""}`}
        </Button>
      </Form>
    </div>
  );
}