import { expect } from "@playwright/test";

// Valida que a compra está com status "PENDENTE"
export async function validarCompraPendente(card) {
  await expect(card).toContainText("PENDENTE");
}

// Valida que a compra está com status "APROVADA"
export async function validarCompraAprovada(card) {
  await expect(card).toContainText("APROVADA");
}
