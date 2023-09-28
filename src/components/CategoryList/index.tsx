import { Table } from "antd";
import { Category } from "../../types";
import { ColumnsType } from "antd/es/table";

interface Props {
  data: Category[];
  columns: ColumnsType<Category>;
}

const CategoryList = ({ data, columns }: Props) => {
  return <Table columns={columns} dataSource={data} />;
};

export default CategoryList;