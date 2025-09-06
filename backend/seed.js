import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const salaId = "68ba4a6134d89bb92767efdd";

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
