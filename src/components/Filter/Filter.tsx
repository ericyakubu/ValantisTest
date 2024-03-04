import { FunctionComponent } from "react";
import { FilterBy } from "../../types";
import classes from "./Filter.module.scss";

type Props = {
  filterBy: FilterBy;
  brands: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleFilter: (type: string, e: any) => void;
};

const Filter: FunctionComponent<Props> = ({
  filterBy,
  brands,
  handleFilter,
}) => {
  return (
    <section className={classes.filter}>
      <label className={classes.label}>
        <span>Min Price:</span>
        <input
          className={classes.input}
          type="number"
          value={filterBy.minPrice}
          onChange={(e) => handleFilter("min", e)}
        />
      </label>
      <label className={classes.label}>
        <span>Max Price:</span>
        <input
          className={classes.input}
          type="number"
          value={filterBy.maxPrice}
          onChange={(e) => handleFilter("max", e)}
        />
      </label>
      <select
        className={classes.select}
        onChange={(e) => handleFilter("brand", e)}
      >
        <option value="">Select brand...</option>
        {brands.map((brand) => (
          <option value={brand} key={brand + " option"}>
            {brand}
          </option>
        ))}
      </select>
    </section>
  );
};

export default Filter;
