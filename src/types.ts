export type ProductType = {
  id: string;
  product: string;
  price: number;
  brand: string | null;
};

export type FilterBy = {
  minPrice: number;
  maxPrice: number;
  brand: string;
};
