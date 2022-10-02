import { Environment } from "../../../environment";
import { Api } from "../axios-config";

export interface IPeopleListing {
  id: number;
  fullName: string;
  cityId: number;
  email: string;
}

export interface IPersonDetail {
  id: number;
  fullName: string;
  cityId: string;
  email: string;
}

type TPersonWithTotalCount = {
  data: IPeopleListing[];
  totalCount: number;
};

const getAll = async (
  page = 1,
  filter = ""
): Promise<TPersonWithTotalCount | Error> => {
  try {
    const relativeUrl = `/peoples?_page=${page}&_limit=${Environment.LIMITE_DE_LINHAS}&fullName_like=${filter}`;
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

const getById = async (id: number): Promise<IPersonDetail | Error> => {
  try {
    const { data } = await Api.get(`/peoples/${id}`);
    if (data) return data;
    return new Error("Erro ao listar os dados dessa pessoa");
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message ||
        "Houve um erro interno, tente novamente"
    );
  }
};

const create = async (
  dataPerson: Omit<IPersonDetail, "id">
): Promise<number | Error> => {
  try {
    const { data } = await Api.post<IPersonDetail>("/peoples", dataPerson);
    if (data) return data.id;
    return new Error("Erro ao cadastrar essa pessoa");
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
  dataPerson: IPersonDetail
): Promise<void | Error> => {
  try {
    await Api.put(`/peoples/${id}`, dataPerson);
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
    await Api.delete(`/peoples/${id}`);
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message ||
        "Houve um erro interno, tente novamente"
    );
  }
};

export const PeopleService = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
