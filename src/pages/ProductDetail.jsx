import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const { productId } = useParams();
  return <h1>Detalle del producto: {productId}</h1>;
};

export default ProductDetail;
