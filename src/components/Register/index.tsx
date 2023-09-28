import { Button, Card, Input, Typography } from "antd";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./RegisterSchema";
import { Register as RegisterProps } from "../../types";
import { useNavigate } from "react-router-dom";

interface Props {
  onSubmit: (values: RegisterProps) => void;
}

const RegistrationForm = ({ onSubmit }: Props) => {
  const navigate = useNavigate();

  const handleSubmit = (values: RegisterProps) => {
    onSubmit(values);
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: handleSubmit,
    validationSchema: validationSchema,
  });

  return (
    <>
      <Card title={"Register to Our Platform"} bordered style={{ width: "350px" }}>
        <form onSubmit={formik.handleSubmit}>
          <div>
            <Typography.Paragraph style={{ textAlign: "left" }}> {"Name"} </Typography.Paragraph>
            <Input name={"name"} placeholder="Enter Your name" value={formik.values.name} onChange={formik.handleChange("name")} status={formik.errors.name && "error"}/>
              {formik.errors.name && (
                <Typography.Paragraph style={{ color: "red" }}> {formik.errors.name} </Typography.Paragraph>
              )}
          </div>

          <div>
            <Typography.Paragraph style={{ marginTop: "10px", textAlign: "left" }}> {"Email"} </Typography.Paragraph>
            <Input name={"email"} placeholder="Enter Your Email"value={formik.values.email} onChange={formik.handleChange("email")} status={formik.errors.email && "error"}/>
              {formik.errors.email && (
                <Typography.Paragraph style={{ color: "red" }}> {formik.errors.email} </Typography.Paragraph>
              )}
          </div>

          <div>
            <Typography.Paragraph style={{ marginTop: "10px", textAlign: "left" }}> {"Password"} </Typography.Paragraph>
            <Input.Password name={"password"} placeholder="Enter Your password" value={formik.values.password} onChange={formik.handleChange("password")} status={formik.errors.password && "error"}/>
              {formik.errors.password && ( 
                <Typography.Paragraph style={{ color: "red" }}> {formik.errors.password} </Typography.Paragraph>
              )}
          </div>

          <Button type={"primary"} htmlType={"submit"} style={{ width: "300px", marginTop: 20 }}> Register </Button>
          <Button type={"default"} htmlType={"submit"} style={{ width: "300px", marginTop: "20px" }} onClick={() => navigate("/")}> Back </Button>
        </form>
      </Card>
    </>
  );
};

export default RegistrationForm;