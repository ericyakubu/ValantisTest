import { FunctionComponent } from "react";
import { ProductType } from "../../../types";
import classes from "./Product.module.scss";

type Props = {
  product: ProductType;
};

const Product: FunctionComponent<Props> = ({ product }) => {
  return (
    <div className={classes.product}>
      <img className={classes.product__img} src="/ring.webp" alt="" />
      <p className={classes.product__id}>{product.id}</p>

      <p className={classes.product__name}>{product.product}</p>
      <p className={classes.product__price}>
        {product.brand && <span>{product.brand}</span>}
        <span>Цена: {product.price}</span>
      </p>
    </div>
  );
};

export default Product;
