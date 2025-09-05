export default function generateCadeiras() {
  const cadeiras = [];
  const fileiras = ["A", "B", "C", "D", "E", "F"];
  const porFileira = 5;

  for (let f = 0; f < fileiras.length; f++) {
    for (let n = 1; n <= porFileira; n++) {
      cadeiras.push({ numeracao: `${fileiras[f]}${n}` });
    }
  }

  return cadeiras;
}
