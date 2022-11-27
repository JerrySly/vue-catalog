import axios from "axios";
const baseUrl = "https://nlstar.com/api/catalog3/v1";

export const getCities = async (term) => {
  return (await axios.get(baseUrl + `/city?term=${term}&county=ru`)).data.data;
};

export const getCityById = async (id) => {
  return (await axios.get(baseUrl + `/city/?id=${id}`)).data.data;
};

export const getCategories = async (cityId) => {
  return (await axios.get(baseUrl + `/menutags/?city_id=${cityId}`)).data.tags;
};

export const getProducts = async (slug, cityId) => {
  return (await axios.get(baseUrl + `/menutags/${slug}?cityId=${cityId}`)).data
    .products;
};
