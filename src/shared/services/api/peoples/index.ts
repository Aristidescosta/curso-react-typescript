import { Environment } from "../../../environment";
import { Api } from "../axios-config";

interface IPeopleListing {
  id: number;
  fullName: string;
  cityId: number;
  email: string;
}

interface IPersonDetail {
  id: number;
  fullName: string;
  cityId: number;
  email: string;
}

type TPersonWithTotalCount = {
	data: IPeopleListing;
	totalCount: number;
}

const getAll = async (page = 1, filter = ""): Promise<TPersonWithTotalCount | Error> => {
  try {
    const relativeUrl = `/peoples?_page=${page}&_limit=${Environment.LIMITE_DE_LINHAS}&fullName_like=${filter}`;
    const { data, headers } = await Api.get(relativeUrl);
    if(data)
		return {
			data,
			totalCount: Number(headers["x-total-count"]) || Environment.LIMITE_DE_LINHAS,
		}
		return new Error("Erro ao listar os registos")
  } catch (error) {
		console.error(error)
		return new Error((error as {message: string}).message || "Erro ao listar os registos")
	}
};

const getById = async (): Promise<any> => {};

const create = async (): Promise<any> => {};

const updateById = async (): Promise<any> => {};

const deleteById = async (): Promise<any> => {};

export const PeopleService = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
