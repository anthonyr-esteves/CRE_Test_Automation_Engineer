function gerarEmailUnico() {
  const timestamp = Date.now();
  return `carlos${timestamp}@teste.com`;
}

export default gerarEmailUnico;
