import { IPerfume } from "@/types/data.dt";
import axios from "../custom/axios";

const getPerfumes = async () => {
  return axios.get<unknown, IPerfume[]>(`perfumes`);
};

const getPerfumeDetail = async (id: string) => {
  return axios.get<unknown, IPerfume>(`perfumes/${id}`);
};

export { getPerfumes, getPerfumeDetail };
