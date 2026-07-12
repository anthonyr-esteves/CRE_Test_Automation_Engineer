import { expect } from "@playwright/test";

// Valida que o card está com status "PENDENTE"
export async function validarArrendamentoPendente(card) {
  await expect(card).toContainText("PENDENTE");
}

// Valida que o card está com status "APROVADO"
export async function validarArrendamentoAprovado(card) {
  await expect(card).toContainText("APROVADO");
}
