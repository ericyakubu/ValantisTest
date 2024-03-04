import axios from "axios";
import CryptoJS from "crypto-js";

const limit = 50;
const stamp = new Date().toISOString().slice(0, 10).replace(/-/g, "");
const password = import.meta.env.VITE_API_PASSWORD;
const xAuth = CryptoJS.MD5(`${password}_${stamp}`).toString();

const url = import.meta.env.VITE_API_URL;
const headers = {
  "X-Auth": xAuth,
};

const getProducts = async (pageNum: number) => {
  const idsRes = await axios.post(
    url,
    {
      action: "get_ids",
      params: {
        limit,
        offset: limit * pageNum,
      },
    },
    {
      headers,
    }
  );

  // Then, fetch items based on the retrieved ids
  const itemsRes = await axios.post(
    url,
    {
      action: "get_items",
      params: {
        ids: idsRes.data.result,
      },
    },
    {
      headers,
    }
  );

  return itemsRes.data;
};

export default getProducts;
