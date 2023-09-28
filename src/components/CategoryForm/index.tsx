import { Typography, Input, Select, Button } from "antd";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./CategorySchema";
import { FormCategory as CategoryProps, Category } from "../../types";
import { useNavigate } from "react-router-dom";

interface Props {
  onSubmit: (values: CategoryProps) => void;
  category?: Category;
}

const CategoryForm = ({ onSubmit, category }: Props) => {
  const handleSubmit = (values: CategoryProps) => {
    onSubmit(values);
  };

  const formik = useFormik({ initialValues: category ?? initialValues, onSubmit: handleSubmit, validationSchema: validationSchema,});

  const navigate = useNavigate();

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <Typography.Paragraph style={{ textAlign: "center" }}> {"Name"} </Typography.Paragraph>
          <Input name={"name"} value={formik.values.name} onChange={formik.handleChange("name")} status={formik.errors.name && "error"}/>
            {formik.errors.name && ( 
              <Typography.Paragraph style={{ color: "red" }}> {formik.errors.name} </Typography.Paragraph>
           )}
        </div>

        <div>
          <Typography.Paragraph style={{ textAlign: "center", marginTop: "10px" }}> {"Status"}  </Typography.Paragraph>
          <Select style={{ width: "300px", textAlign: "center" }} value={formik.values.is_active} onChange={(value) => formik.setFieldValue("is_active", value)}
            options={[
              {
                value: true,
                label: "Active",
              },
              {
                value: false,
                label: "In-active",
              },
            ]}
          ></Select>
            {formik.errors.is_active && (
              <Typography.Paragraph style={{ color: "red" }}> {formik.errors.is_active} </Typography.Paragraph>
            )}
        </div>

        <Button type={"primary"} htmlType={"submit"} style={{ marginTop: 20, width: "300px" }}>Submit</Button>
        <Button type={"default"} htmlType={"submit"} style={{ marginTop: 10, width: "300px" }} onClick={() => navigate("/category")}> Back </Button>
      </form>
    </>
  );
};

export default CategoryForm;