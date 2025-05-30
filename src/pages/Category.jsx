import { useParams } from "react-router-dom";

const Category = () => {
  const { categoryId } = useParams();
  return <h1>Categoría: {categoryId}</h1>;
};

export default Category;
