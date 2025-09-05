import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const salaId = "68ba47428b1d764cf26a44a4";

  await prisma.cadeira.createMany({
    data: [
      { numeracao: "A1", salaId },
      { numeracao: "A2", salaId },
      { numeracao: "A3", salaId },
      { numeracao: "A4", salaId },
      { numeracao: "A5", salaId },
    ],
  });

  console.log("Cadeiras criadas com sucesso!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
