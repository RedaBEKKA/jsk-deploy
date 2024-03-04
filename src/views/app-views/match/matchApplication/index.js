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
  fetchPlayersByPosition,
  createMatch,
  updateMatch,
  fetchOneMatch,
  
} from "store/slices/matchSlice";
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

const MatchApplication = ({ mode}) => {
  
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { error, match, loading,playersByPosition} = useSelector((state) => state.matchs);
  
  console.log(playersByPosition,'players position');
  const [selectedPositions, setSelectedPosition] = useState({});
 
  
  const onPositionChange = (value, position) => {
    
    dispatch(fetchPlayersByPosition(position));
  };
  useEffect(() => {
    
    dispatch(fetchPlayersByPosition());
  }, [dispatch]);

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

  const [initVal,setInitialValues] = useState(null)
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const { user } = useSelector((state) => state.auth);
  // const date=moment(match.date).format("YYYY-MM-DD")
  // console.log(date, "date match");

  const dateFormat = "YYYY-MM-DD"
  useEffect(() => {
    if (mode === EDIT) {
      dispatch(fetchOneMatch(id));
    }
  }, [dispatch, mode, id]);

  useEffect(() => {
    if (mode === EDIT && match) {
      const updatedMatch = {
        ...match,
        date: moment(match.date)

        
      };
  
      form.setFieldsValue(updatedMatch);
      

 
    }
  }, [form, mode, match]);

  useEffect(() => {
    dispatch(hideError());
  }, []);

  const onFinish = async () => {
    
    
 

    try {
     
      const values = await form.validateFields();
      const modifiedValues = {
        ...values,
      };
      const formData = new FormData();

    // Log the values object
    console.log("Values match:", values.titled);

    // Append the values to the formData
    formData.append("titled", values.titled);
    formData.append("stadiumName", values.stadiumName);
    formData.append("competition", values.competition);
    // const dateMatch=moment(values.date).format("YYYY-MM-DD")
    formData.append("date", values.date.format("YYYY-MM-DD"));
    formData.append("hour", values.hour);
    // formData.append("numberOfGoals", values.numberOfGoals);
    formData.append("goalkeeper", values.goalkeeper);
    formData.append("defender", values.defender);
    formData.append("midfielder", values.midfielder);
    formData.append("attacker", values.attacker);
    formData.append("myClubResult", values.myClubResult?values.myClubResult:0);
    formData.append("nameAdversary", values.nameAdversary);
    formData.append("resultAdversary", values.resultAdversary?values.resultAdversary:0);
   
    
    if (values.adversaryLogo && values.adversaryLogo[0]) {
      formData.append("adversaryLogo", values.adversaryLogo[0].originFileObj);
    }
 

    for (let obj of formData) {
      
      console.log(obj,'match');
     
    }
console.log(formData,'form match');

  

   
      if (mode === ADD) {
      await dispatch(createMatch(formData)).unwrap();
       AntMessage.success(t("Match added successfully!"), 1);
      navigate(-1);
    }
    if (mode === EDIT) {
      await dispatch(updateMatch({ id: match._id, data: formData })
      ).unwrap();
      await AntMessage.success(t("Match updated!"), 1);
      navigate(-1);
    }
  } catch (error) {
    AntMessage.error(error);
  } finally {
    dispatch(hideLoading());
  }
  
  }

  return (
    <>
      <Form
        layout="vertical"
        form={form}
        onFinish={onFinish}
        name="job-form"
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
                  {mode === "ADD" ? t("Add a matche") : `${t("Edit matche")}`}
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
                  label={t("Stadium name")}
                  name="stadiumName"
                  rules={[
                    {
                      required: true,
                      message: t("Required stadiumName"),
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item label={t("match.competition")} name="competition">
                  <Select
                    allowClear
                    options={[
                      {
                        value: "Coupe d'algérie",
                        label: "Coupe d'algérie",
                      },
                      {
                        value: "ligue des champions",
                        label: "ligue des champions",
                      },
                      {
                        value: "Coupe de CAF",
                        label: "Coupe de CAF",
                      },
                      {
                        value: "ligue 1 mobilis",
                        label: "ligue 1 mobilis",
                      },
                      {
                        value: `Coupe d'arabe`,
                        label: `Coupe d'arabe`,
                      },
                      {
                        value: "Matchs amicaux",
                        label: "Matchs amicaux",
                      },
                    ]}
                  />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item
                  label="Date"
                  name="date"
                  rules={[
                    {
                      required: true,
                      message: t("Please select a day"),
                    },
                  ]}
                >
                  <DatePicker style={{ width: "100%" }} format={dateFormat}/>
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label={t("From")}
                  name="hour"
                  rules={[
                    {
                      required: true,
                      message: t("Select Starting time"),
                    },
                  ]}
                >
                  <TimePicker
                    format="HH:mm"
                    valueFormat="HH:mm"
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Card>
          <Col span={24}>
            <Card title={t("Staistiques")}>
              <Divider className="m-0 mb-4" />

              {mode && (
                <>
                  <Row gutter={16}>
                    <Col xs={24} sm={24} md={12}>
                      <Form.Item label={t("register.username2Palceholder")}>
                        <Input disabled value={user.name} name="myClubName" />
                      </Form.Item>
                    </Col>

                    <Col xs={24} sm={24} md={12}>
                      <Form.Item
                        name="myClubResult"
                        label={t("Nombre de buts")}

                        // rules={rules.goals}
                      >
                        <InputNumber style={{ width: "100%" }} />
                      </Form.Item>
                    </Col>

                    <Col xs={24} sm={24} md={12}>
                      <Form.Item
                        label={t("register.usernamePalceholder")}
                        name="nameAdversary"
                      >
                        <Input />
                      </Form.Item>
                    </Col>

                    <Col xs={24} sm={24} md={12}>
                      <Form.Item
                        name="resultAdversary"
                        label={t("Nombre de buts")}

                        // rules={rules.goals}
                      >
                        <InputNumber min={0} style={{ width: "100%" }} />
                      </Form.Item>
                      </Col>

                      <Col xs={24} sm={24} md={12}>
                      <Form.Item
                     
                          label='Mon logo'
                          name="myClubLogo"
                          value={user.image[0].filename}
                          // rules={rules.image}
                          valuePropName="fileList"
                          getValueFromEvent={(e) => e.fileList}
                       
                        >
                          <Upload name="image" maxCount={1} listType="file" {...propss}    disabled>


                        <Button icon={<UploadOutlined />}>{user.image[0].filename}</Button>
                        </Upload>
                          {/* {user.image.length > 0 && (
                            <div>

                              <img src={`http://localhost:5000/${user.image[0].path}`}  />
                            </div>
                          )} */}
                    </Form.Item>
                    
                    </Col>
                      <Col xs={24} sm={24} md={12}>
                      <Form.Item
                          label='Logo Adversaire'
                          name="adversaryLogo"
                          rules={rules.adversaryLogo}
                          valuePropName="fileList"
                          getValueFromEvent={(e) => e.fileList}
                        >
                          <Upload name="adversaryLogo" maxCount={1} listType="file" {...propss}>


                        <Button icon={<UploadOutlined />}>Ajouter un logo</Button>
                        </Upload>
                    </Form.Item>
                      </Col>

                     
                  </Row>
                </>
              )}
            </Card>
          </Col>
          <Col span={24}>
            <Card title={t("Team composition")}>
              <Divider className="m-0 mb-4" />

              {mode && (
                <>
                  <Form.Item label={t("Guard")} name="goalkeeper">
                    <Select
                      allowClear
                      options={(playersByPosition["goalkeeper"] || []).map((player) => ({
                        value: player.fullName,
                        label: player.fullName,
                      }))}
                      onChange={(value) => onPositionChange(value, 'goalkeeper')}
                    />
                  </Form.Item>
                  <Form.Item label={t("Defender")} name="defender">
                    <Select
                      mode="multiple"
                      showArrow
                      allowClear
                      maxTagCount="responsive"
                      size="large"
                      style={{
                        width: "100%",
                      }}
                      options={(playersByPosition["defender"] || []).map((player) => ({
                        value: player.fullName,
                        label: player.fullName,
                      }))}
                      onChange={(value) => onPositionChange(value, 'defender')}
                    />
                  
                   
                  </Form.Item>
                  <Form.Item label={t("midfielder")} name="midfielder">
                    <Select
                      mode="multiple"
                      showArrow
                      allowClear
                      maxTagCount="responsive"
                      size="large"
                      style={{
                        width: "100%",
                      }}
                      options={(playersByPosition["midfielder"] || []).map((player) => ({
                        value: player.fullName,
                        label: player.fullName,
                      }))}
                      onChange={(value) => onPositionChange(value, 'midfielder')}
                    />
                   
                   
                  </Form.Item>
                  <Form.Item label={t("forward")} name="attacker">
                    <Select
                      mode="multiple"
                      showArrow
                      allowClear
                      maxTagCount="responsive"
                      size="large"
                      style={{
                        width: "100%",
                      }}
                      options={(playersByPosition["attacker"] || []).map((player) => ({
                        value: player.fullName,
                        label: player.fullName,
                      }))}
                      onChange={(value) => onPositionChange(value, 'attacker')}
                    />
                     
                   
                  </Form.Item>
                </>
              )}
            </Card>
          </Col>
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

export default MatchApplication;
