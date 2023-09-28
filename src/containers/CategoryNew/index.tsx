import { CategoryForm } from "../../components";
import { useNavigate } from "react-router-dom";
import { FormCategory as CategoryProps } from "../../types";
import { Card, Col } from "antd";

const createCategory = () => {
  const navigate = useNavigate();
  const onSubmit = async (values: CategoryProps) => {
    try {
      const token = sessionStorage.getItem("token");

      if (!token) {
        alert("Session is expired. Please log in.");
        navigate("/");
        return;
      }

      const fetching = await fetch("https://mock-api.arikmpt.com/api/category/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(values),
        }
      );

      await fetching.json();
      navigate("/category");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
    <Col style={{height: '500px'}} justify-content="center" align-items="center">
      <Card style={{ width: "350px" }} bordered title={"Add New Category"} >
        <CategoryForm onSubmit={onSubmit} />
      </Card>
    </Col>
      
    </>
  );
};

export default createCategory;