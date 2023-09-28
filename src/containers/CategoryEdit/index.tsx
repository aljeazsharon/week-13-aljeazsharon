import { CategoryForm } from "../../components";
import { Card, notification } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FormCategory as CategoryProps, Category } from "../../types";

const UpdateCategory = () => {
  const navigate = useNavigate();
  const [category, setCategories] = useState<Category>();

  const { id } = useParams();

  const token = sessionStorage.getItem("token");

  const getCategory = useCallback(async () => {
    const fetching = await fetch(
      `https://mock-api.arikmpt.com/api/category/${id}`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    const response: Category = await fetching.json();

    setCategories(response);
    console.log(response);
  }, [id, token]);

  useEffect(() => {
    getCategory();
  }, [getCategory]);

  const onSubmit = async (values: CategoryProps) => {
    try {
      const fetching = await fetch(`https://mock-api.arikmpt.com/api/category/update`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ ...values, id: id }),
        }
      );

      if (fetching.status === 204) {
        notification.success({
          message: 'Category Update Success!',
          duration: 4,
          className: "custom-notification",
        });
        navigate("/category");
      } 
      
      else {
        notification.error({
          message: `Category Update Failed!`,
          duration: 4,
          className: "custom-notification",
        });
      }
    } 
    catch (error) {
      alert(error);
    }
  };

  if (category) {
    return (
      <>
        <Card title={"Edit Category"} bordered style={{ width: "350px" }}>
          <CategoryForm onSubmit={onSubmit} category={category} />
        </Card>
      </>
    );
  }
  return null;
};

export default UpdateCategory;