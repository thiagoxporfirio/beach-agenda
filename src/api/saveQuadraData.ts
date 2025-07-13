import api from "./axiosConfig";

interface QuadraData {
  quadraName: string;
  date: string;
  time: string;
}

export const saveQuadraData = async (data: QuadraData): Promise<void> => {
  try {
    const response = await api.post("/quadras", data);
    console.log("Dados salvos com sucesso:", response.data);
  } catch (error) {
    console.error("Erro ao salvar os dados da quadra:", error);
    throw error;
  }
};
