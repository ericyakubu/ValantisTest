import { FunctionComponent } from "react";
import { ProductType } from "../../types";
import { Product } from "..";
import classes from "./Products.module.scss";

type Props = {
  filteredProducts: ProductType[];
};
const Products: FunctionComponent<Props> = ({ filteredProducts }) => {
  return (
    <main className={classes.products}>
      {filteredProducts.map((product, i) => (
        <Product product={product} key={`product-${i}`} />
      ))}
    </main>
  );
};

export default Products;
