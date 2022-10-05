import { Environment } from "../../../environment";
import { Api } from "../axios-config";

export interface ICityListing {
  id: number;
  name: string;
}

export interface ICityDetail {
  id: number;
  name: string;
}

type TCityWithTotalCount = {
  data: ICityListing[];
  totalCount: number;
};

const getAll = async (
  page = 1,
  filter = ""
): Promise<TCityWithTotalCount | Error> => {
  try {
    const relativeUrl = `/cities?_page=${page}&_limit=${Environment.LIMITE_DE_LINHAS}&name_like=${filter}`;
    const { data, headers } = await Api.get(relativeUrl);
    if (data)
      return {
        data,
        totalCount: Number(headers["x-total-count"]) || data.length,
      };
    return new Error("Erro ao listar os registos");
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || "Erro ao listar os registos"
    );
  }
};

const getById = async (id: number): Promise<ICityDetail | Error> => {
  try {
    const { data } = await Api.get(`/cities/${id}`);
    if (data) return data;
    return new Error("Erro ao listar os dados dessa cidade");
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message ||
        "Houve um erro interno, tente novamente"
    );
  }
};

const create = async (
  dataCity: Omit<ICityDetail, "id">
): Promise<number | Error> => {
  try {
    const { data } = await Api.post<ICityDetail>("/cities", dataCity);
    if (data) return data.id;
    return new Error("Erro ao cadastrar essa cidade");
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message ||
        "Houve um erro interno, tente novamente"
    );
  }
};

const updateById = async (
  id: number,
  dataCity: ICityDetail
): Promise<void | Error> => {
  try {
    await Api.put(`/cities/${id}`, dataCity);
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message ||
        "Houve um erro interno, tente novamente"
    );
  }
};

const deleteById = async (id: number): Promise<void | Error> => {
  try {
    await Api.delete(`/cities/${id}`);
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message ||
        "Houve um erro interno, tente novamente"
    );
  }
};

export const CityService = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
