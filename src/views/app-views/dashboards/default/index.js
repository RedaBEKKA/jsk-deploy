import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Button,
  Card,
  Table,
  Tag,
  Select,
  Badge,
  Image,
  Divider,
  Typography,
} from "antd";
import Flex from "components/shared-components/Flex";
import AvatarStatus from "components/shared-components/AvatarStatus";
import DataDisplayWidget from "components/shared-components/DataDisplayWidget";
import DonutChartWidget from "components/shared-components/DonutChartWidget";
import NumberFormat from "react-number-format";
import { createAvatar } from "@dicebear/core";
import { initials } from "@dicebear/collection";


import moment from "moment";
import { DATE_FORMAT_DD_MM_YYYY } from "constants/DateConstant";
import utils from "utils";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { CSVLink } from "react-csv";
import { saveAs } from "file-saver";
import JSZip from "jszip";
import Papa from "papaparse";
import { t } from "i18next";



const { Option } = Select;
const { Title } = Typography;



const getPaymentStatus = (status) => {
  if (status === "Paid") {
    return "success";
  }
  if (status === "Pending") {
    return "warning";
  }
  if (status === "Expired") {
    return "error";
  }
  return "";
};

const getShippingStatus = (status) => {
  if (status === "Ready") {
    return "blue";
  }
  if (status === "Shipped") {
    return "cyan";
  }
  return "";
};

const LatestUsersAdded = () => {
  const [timeframe, setTimeframe] = useState("week");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users, status, error } = useSelector((state) => state.users);
  const { didRefresh } = useSelector((state) => state.auth);

  // useEffect(() => {
  //   dispatch(fetchUsers());
  //   // getLatestUsersAdded(timeframe).then((data) => {
  //   //     setLatestUsersAdded(data);
  //   //   });
  // }, [didRefresh]);
  // }, [timeframe]);

  const handleTimeframeChange = (value) => {
    setTimeframe(value);
    
  };

  return (
    <Card
      title={t("Latest users")}
      extra={
        <>
          <Select
            defaultValue={timeframe}
            size="small"
            style={{ minWidth: 110, marginRight: "15px" }}
            onChange={handleTimeframeChange}
          >
            <Option value="week">{t("This week")}</Option>
            <Option value="month">{t("This month")}</Option>
            <Option value="year">{t("This year")}</Option>
          </Select>
          <a
            onClick={(e) => {
              e.preventDefault();
              navigate("/app/utilisateurs/liste");
            }}
          >
            {t("Go to page")}
          </a>
        </>
      }
    >
      {users?.map((elm) => {
        const avatar = createAvatar(initials, {
          seed: elm.username,
          radius: 50,
          backgroundColor: [
            "00acc1",
            "5e35b1",
            "1e88e5",
            "d81b60",
            "e53935",
            "7cb342",
          ],
        }).toDataUriSync();

        return (
          <Flex
            className="w-100 py-3"
            justifyContent="between"
            alignItems="center"
            key={elm.username}
          >
            <AvatarStatus
              shape="square"
              src={avatar}
              name={elm.username}
              subTitle={elm.email}
            />
          </Flex>
        );
      })}
    </Card>
  );
};

const RecentOrder = () => {
  const navigate = useNavigate();
const tableColumns = [
  {
    title: "ID",
    dataIndex: "id",
  },
  {
    title: "Product",
    dataIndex: "name",
    render: (_, record) => (
      <Flex>
        <AvatarStatus size={30} src={record.image} name={record.name} />
      </Flex>
    ),
    sorter: (a, b) => utils.antdTableSorter(a, b, "name"),
  },
  {
    title: "Date",
    dataIndex: "date",
    render: (_, record) => (
      <span>{moment.unix(record.date).format(DATE_FORMAT_DD_MM_YYYY)}</span>
    ),
    sorter: (a, b) => utils.antdTableSorter(a, b, "date"),
  },
  {
    title: "Order status",
    dataIndex: "orderStatus",
    render: (_, record) => (
      <>
        <Tag color={getShippingStatus(record.orderStatus)}>
          {record.orderStatus}
        </Tag>
      </>
    ),
    sorter: (a, b) => utils.antdTableSorter(a, b, "orderStatus"),
  },
  {
    title: "Payment status",
    dataIndex: "paymentStatus",
    render: (_, record) => (
      <>
        <Badge status={getPaymentStatus(record.paymentStatus)} />
        <span>{record.paymentStatus}</span>
      </>
    ),
    sorter: (a, b) => utils.antdTableSorter(a, b, "paymentStatus"),
  },
  {
    title: "Total",
    dataIndex: "amount",
    render: (_, record) => (
      <span className="font-weight-semibold">
        <NumberFormat
          displayType={"text"}
          value={(Math.round(record.amount * 100) / 100).toFixed(2)}
          prefix={"$"}
          thousandSeparator={true}
        />
      </span>
    ),
    sorter: (a, b) => utils.antdTableSorter(a, b, "amount"),
  },
];

  return (
    <Card
      title={t("Recent jobs")}
      extra={
        <a
          onClick={(e) => {
            e.preventDefault();
            navigate("/app/jobs/liste");
          }}
        >
          {t("Go to page")}
        </a>
      }
    >
      <Table
        pagination={false}
        columns={tableColumns}
       
        rowKey="id"
      />
    </Card>
  );
};

const DefaultDashboard = () => {
  return (
    <>
      <Row gutter={16}>
       
        <Divider>{t("clubs' evaluations")}</Divider>
        <Col xs={24} sm={24} md={24} lg={24}>
          
        </Col>
        <Divider>{t("Matches & players")}</Divider>

        
      
      </Row>
    </>
  );
};

export default DefaultDashboard;
