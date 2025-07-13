export const mockLogin = (phone: string, password: string): string => {
  if (phone && password) {
    return "mockToken123";
  }

  throw new Error("Telefone ou senha inválidos");
};
