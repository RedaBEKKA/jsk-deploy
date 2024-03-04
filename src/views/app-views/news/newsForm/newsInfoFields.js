import React from "react";
import { useEffect, useState } from "react";
import {
  Input,
  Row,
  Col,
  Card,
  Form,
  Upload,
  Button,
  DatePicker,

  Divider,
 
} from "antd";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { t } from "i18next";
import {
  UploadOutlined,
} from "@ant-design/icons";

import { rules } from "./newsFieldsRules";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";


const { TextArea } = Input;
const { Dragger } = Upload;

const imageUploadProps = {
  name: "file",
  multiple: false,
  listType: "picture",
  showUploadList: true,
};

const NewsInfoFields = (props) => {
  const dateFormat = "YYYY-MM-DD";
  const EDIT = "EDIT";
  const { mode } = props;
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);

  const propss = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);
      return false;
    },
    fileList,
  };

  const [editorContent, setEditorContent] = useState("");
  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    // const plainText = data.replace(/<\/?p>/g, '').replace(/&nbsp;/g, ' '); // Supprimer les balises <p> et remplacer &nbsp; par un espace
    setEditorContent(data);
console.log(data,'data');
    if (props.onEditorChange) {
      props.onEditorChange(data);
    }
  };


  const {actualite} = useSelector((state) => state.news);
  useEffect(() => {
    if (mode === EDIT && actualite) {
      setEditorContent(actualite.description || ''); // Assurez-vous que actualite.description est défini
    }
  }, [mode, actualite]);

  return (
    <div>
      <Row gutter={16} align="middle">
        <Col xs={24} sm={24} md={24}>
          <Card title={t("news.addAndModify.step1.PersonnalInfoCard.title")}>
            <Divider className="m-0 mb-4" />
            <Row gutter={16}>
              <Col xs={24} sm={24} md={24}>
                <Form.Item
                  name="articleTitle"
                  label={t(
                    "actualite.addAndModify.step1.PersonnalInfoCard.titleArtocle.label",
                  )}
                  rules={rules.articleName}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              label={t("actualite.addAndModify.step1.ProfilePicCard.title")}
              name="image"
              rules={rules.image}
              valuePropName="fileList"
              getValueFromEvent={(e) => e.fileList}
            >
              <Upload name="image" maxCount={1} listType="file" {...propss}>


            <Button icon={<UploadOutlined />}>Ajouter une image</Button>
            </Upload>
                </Form.Item>
            <Form.Item
              label={t("actualite.addAndModify.step1.videoCard.title")}
              name="video"
              valuePropName="fileList"
              getValueFromEvent={(e) => e.fileList}
            >
              <Upload name="video" maxCount={1} listType="file" {...propss}>


            <Button icon={<UploadOutlined />}>Ajouter une video</Button>
            </Upload>
            </Form.Item>

            <Col xs={24} sm={24} md={24}>
              <Form.Item
                name="createdDate"
                label={t(
                  "actualite.addAndModify.step1.PersonnalInfoCard.creationDate.label",
                )}
                rules={rules.creationDate}
              >
                <DatePicker
                  format={dateFormat}
                  size="large"
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>

            <Form.Item
              label="Description"
              name="description"
              rules={rules.description}
            >
              <CKEditor
                editor={ClassicEditor}
                data={editorContent}
                onChange={handleEditorChange}
                onReady={(editor) => {
                  editor.editing.view.change((writer) => {
                    writer.setStyle(
                      //use max-height(for scroll) or min-height(static)
                      "min-height",
                      "200px",
                      editor.editing.view.document.getRoot(),
                    );
                  });
                }}
                config={{
                  language: 'fr',
                  direction: 'ltr', // Assurez-vous que la direction est définie sur ltr (Left to Right)
                }}
                
              />
            </Form.Item>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default NewsInfoFields;
