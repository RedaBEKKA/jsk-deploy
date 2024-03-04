import { t } from "i18next";
import moment from "moment";
export const rules = {
  companyName: [
    {
      required: true,
      message: t("the company name is required"),
    },
  ],

  RC: [
    {
      required: true,
      message: t("the RC is required"),
    },
  ],
  image: [
    {
      required: true,
      message: t("the image is required"),
    },
  ],
  phoneNumber: [
    {
      required: true,
      message: t("the phone number is required"),
    },
  ],
  email: [
    {
      required: true,
      message: t("the email is required"),
    },
  ],
};
