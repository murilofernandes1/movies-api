import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const salaId = "68bf70244138d811c3d80896";
async function main() {
  await prisma.cadeira.createMany({
    data: [
      { numeracao: "A1", salaId },
      { numeracao: "A2", salaId },
      { numeracao: "A3", salaId },
      { numeracao: "A4", salaId },
      { numeracao: "A5", salaId },

      { numeracao: "B1", salaId },
      { numeracao: "B2", salaId },
      { numeracao: "B3", salaId },
      { numeracao: "B4", salaId },
      { numeracao: "B5", salaId },

      { numeracao: "C1", salaId },
      { numeracao: "C2", salaId },
      { numeracao: "C3", salaId },
      { numeracao: "C4", salaId },
      { numeracao: "C5", salaId },
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
