import React from "react";
import { Button, Card, Input, Typography } from "antd";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./LoginSchema";
import { Login as LoginProps } from "../../types";
import { useNavigate } from "react-router-dom";

interface Props {
  onSubmit: (values: LoginProps) => void;
}

const LoginForm = ({ onSubmit }: Props) => {
  const navigate = useNavigate();

  const handleSubmit = (values: LoginProps) => {
    onSubmit(values);
  };

  const formik = useFormik({ initialValues: initialValues, onSubmit: handleSubmit, validationSchema: validationSchema,});

  return (
    <>
      <Card title={"Login to our Platform"} bordered style={{ width: "350px" }}>
        <form onSubmit={formik.handleSubmit}>
          <div>
            <Typography.Paragraph style={{ textAlign: "left" }}> {"Email"} </Typography.Paragraph>
            <Input name={"email"} placeholder="Enter Your email" value={formik.values.email} onChange={formik.handleChange("email")} status={formik.errors.email && "error"}/>
                {formik.errors.email && (
                    <Typography.Paragraph style={{ color: "red" }}> {formik.errors.email} </Typography.Paragraph>
                )}
          </div>

          <div>
            <Typography.Paragraph style={{ marginTop: "10px", textAlign: "left" }}> {"Password"} </Typography.Paragraph>
            <Input.Password name={"password"} placeholder="Enter Your password" value={formik.values.password} onChange={formik.handleChange("password")}/>
                {formik.errors.password && (
                    <Typography.Paragraph style={{ color: "red" }}> {formik.errors.password} </Typography.Paragraph>
                )}
          </div>

          <Button type={"primary"} htmlType={"submit"} style={{ width: "300px", marginTop: 20 }}> Login </Button>
        </form>

        <div style={{ marginTop: "30px" }}> <p style={{ fontStyle: "italic" }}>Don't have an account?, </p>
          <Button type={"default"} htmlType={"submit"} style={{ width: "300px" }} onClick={() => navigate("/register")}> Register here!</Button>
        </div>
      </Card>
    </>
  );
};

export default LoginForm;