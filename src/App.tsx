import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { FilterBy, ProductType } from "./types";
import getProducts from "./api/getProducts";
import { Filter, Pagination, Products } from "./components";
function App() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [pageNum, setPageNum] = useState<number>(0);
  const [brands, setBrands] = useState<string[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([]);
  const [filterBy, setFilterBy] = useState<FilterBy>({
    minPrice: 0,
    maxPrice: 1000000,
    brand: "",
  });

  const queryProds = useQuery("products", () => getProducts(pageNum), {
    enabled: false,
    onSuccess: (data) => {
      const prices = data.result.map((product: ProductType) => product.price);
      const check = prices.sort((a: number, b: number) => a - b);
      const brands = [
        ...new Set(
          data.result
            .map((product: ProductType) => product.brand)
            .filter((brand: string | null) => typeof brand === "string")
        ),
      ];
      setBrands(brands as string[]);

      setFilterBy({
        brand: "",
        minPrice: check[0],
        maxPrice: check[check.length - 1],
      });
      setProducts(data.result);
      setFilteredProducts(data.result);
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFilter = (type: string, e: any) => {
    switch (type) {
      case "min":
        setFilterBy((prev) => ({ ...prev, minPrice: e.target.value }));
        break;
      case "max":
        setFilterBy((prev) => ({ ...prev, maxPrice: e.target.value }));
        break;
      case "brand":
        setFilterBy((prev) => ({ ...prev, brand: e.target.value }));
        break;
    }
  };

  useEffect(() => {
    queryProds.refetch();
  }, [pageNum]);

  useEffect(() => {
    const filtered = products.filter((product) => {
      const priceCheck =
        product.price >= filterBy.minPrice &&
        product.price <= filterBy.maxPrice;
      const brandCheck =
        filterBy.brand === "" ? true : product.brand === filterBy.brand;
      return priceCheck && brandCheck;
    });

    setFilteredProducts(filtered);
  }, [filterBy]);

  if (queryProds.isLoading) return <>Loading...</>;
  if (queryProds.isSuccess)
    return (
      <>
        {filteredProducts && (
          <>
            <Filter
              filterBy={filterBy}
              brands={brands}
              handleFilter={handleFilter}
            />
            <main>
              <Products filteredProducts={filteredProducts} />
            </main>
            <Pagination pageNum={pageNum} setPageNum={setPageNum} />
          </>
        )}
      </>
    );
}

export default App;
