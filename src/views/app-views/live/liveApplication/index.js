import React, { useState, useEffect } from "react";
import {
  Input,
  Row,
  Col,
  Card,
  Form,
  Upload,
  message as AntMessage,
  DatePicker,
  TimePicker,
  Select,
  Radio,
  InputNumber,
  Checkbox,
  Button,
  Divider,
  Modal,
  Alert,
  Space,
  Switch,
} from "antd";
import { CheckOutlined, UploadOutlined } from "@ant-design/icons";
import children from "assets/data/children.json";
import { rules } from "views/app-views/news/newsForm/newsFieldsRules";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {
  hideError,
  hideLoading,
  showLoading,
  createLive,
  updateLive,
  fetchOneLive,
} from "store/slices/liveSlice";
import { useNavigate } from "react-router-dom/dist";
import { t } from "i18next";
import Icon from "components/util-components/Icon";
import { useParams } from "react-router-dom";
import { useForm } from "antd/lib/form/Form";
import PageHeaderAlt from "components/layout-components/PageHeaderAlt";
import Flex from "components/shared-components/Flex";
import { Navigate } from "react-router-dom/dist";
import { getUser } from "store/slices/authSlice";

const { TextArea } = Input;

const { Option } = Select;

const ADD = "ADD";
const EDIT = "EDIT";

const LiveApplication = ({ mode }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { error, live, loading } = useSelector((state) => state.lives);

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

  const [initVal, setInitialValues] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const { user } = useSelector((state) => state.auth);

  const dateFormat = "YYYY-MM-DD";
  useEffect(() => {
    if (mode === EDIT) {
      dispatch(fetchOneLive(id));
    }
  }, [dispatch, mode, id]);

  useEffect(() => {
    if (mode === EDIT && live) {
      const updatedLive = {
        ...live,
        date: moment(live.creationDate),
      };
      form.setFieldsValue(updatedLive);
    }
  }, [form, mode, live]);

  //permet d'initier la valeur de display a true 
  useEffect(() => {
      if(mode===ADD) {form.setFieldValue("display",true)}
  }, [form, mode, live]);

  useEffect(() => {
    dispatch(hideError());
  }, []);

  const onFinish = async () => {
    try {
      const values = await form.validateFields();
      const modifiedValues = {
        ...values,
        creationDate: values.date.format("YYYY-MM-DD"),
      };
      const {... restvalues} = modifiedValues
      if (mode === ADD) {
        console.log("the mode is ADD /////");
        await dispatch(createLive(restvalues)).unwrap();
        AntMessage.success(t("Live added successfully!"), 1);
        navigate(-1);
      }
      if (mode === EDIT) {
        await dispatch(updateLive({ id: live._id, data: restvalues })).unwrap();
        await AntMessage.success(t("Live updated!"), 1);
        navigate(-1);
      }
    } catch (error) {
      AntMessage.error(error);
    } finally {
      dispatch(hideLoading());
    }
  };

  return (
    <>
      <Form
        layout="vertical"
        form={form}
        onFinish={onFinish}
        name="live-form"
        className="ant-advanced-search-form"
        initialValues={initVal}
      >
        <PageHeaderAlt className="border-bottom mb-4">
          <div className="container">
            <Flex
              mobileFlex={false}
              justifyContent="between"
              alignItems="center"
            >
              <div>
                <Icon className="font-size-lg mr-2" type={CheckOutlined} />
                <h2 className="mb-3" style={{ display: "inline-block" }}>
                  {mode === "ADD" ? t("Add a live") : `${t("Edit live")}`}
                </h2>
              </div>
            </Flex>
          </div>
        </PageHeaderAlt>

        <div className="container">
          <Card size="large">
            <Row gutter={16}>
              {mode && (
                <Col span={24}>
                  <Form.Item
                    label={t("newslist.table.newsCell")}
                    name="titled"
                    rules={[
                      {
                        required: true,
                        message: t("Required title"),
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              )}

              <Col span={24}>
                <Form.Item
                  label={t("link")}
                  name="link"
                  rules={[
                    {
                      required: true,
                      message: t("Required link"),
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item
                  label={t("Date")}
                  name="date"
                  rules={[
                    {
                      required: true,
                      message: t("Please select a day"),
                    },
                  ]}
                >
                  <DatePicker style={{ width: "100%" }} format={dateFormat} />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item label={t("display")} name="display" valuePropName="checked">
                  <Switch defaultChecked={live.display} />
                </Form.Item>
              </Col>
            </Row>
          </Card>
        </div>
        <div className="mt-2" style={{ textAlign: "center" }}>
          <Button
            icon={<CheckOutlined />}
            htmlType="submit"
            loading={loading}
            type="primary "
          >
            {mode === ADD
              ? t("actualite.addNews.addButton")
              : t("actualite.modifyNews.modifyButton")}
          </Button>
        </div>
      </Form>
    </>
  );
};

export default LiveApplication;
