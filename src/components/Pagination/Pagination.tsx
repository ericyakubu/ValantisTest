import { Dispatch, FunctionComponent, SetStateAction } from "react";
import { Button } from "../UI";
import classes from "./Pagination.module.scss";

type PaginationType = {
  pageNum: number;
  setPageNum: Dispatch<SetStateAction<number>>;
};

const Pagination: FunctionComponent<PaginationType> = ({
  pageNum,
  setPageNum,
}) => {
  const prevPage = () => {
    if (pageNum !== 0) setPageNum(pageNum - 1);
  };

  const nextPage = () => setPageNum(pageNum + 1);

  return (
    <section className={classes.pagination}>
      <Button text="Previous" onClick={prevPage} />
      <span>{pageNum + 1}</span>
      <Button text="Next" onClick={nextPage} />
    </section>
  );
};

export default Pagination;
