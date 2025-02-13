import axios from "axios";

const BASE_URL = "https://bright-horizon-strapi-1.onrender.com/api";

const API_KEY =
  "9378d1800fd432eaa82fd5573737fcfebf9f1dc4639b14f369bb70287445a7efa4512b7d6176685bf5f42d553612d7660792c44f649cf7db10a89fddc33dcdeb5cb911cd654280a51d95e132ccee452492754bf6d4483d714745b922979b8fb8e72d5b6ba0e3dc993246fdd41f090f4cac8f380eff152946ff78211195f17754";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: "Bearer " + API_KEY,
  },
});

const getBlog = () => axiosInstance.get("/blogs?populate=*");
const getGallery = ()=>axiosInstance.get("/galleries?populate=*")

export default {
  getBlog,
  getGallery
};
