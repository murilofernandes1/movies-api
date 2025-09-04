export default function generateCadeiras() {
  const cadeiras = []; //responsavel por armazenar as cadeiras
  const fileiras = ["A", "B", "C", "D", "E", "F"]; //definindo as letras que representam as fileiras
  const porFileira = 5; //aqui indicamos que cada fileira tem 5 cadeiras

  for (let f = 0; f < fileiras.length; f++) {
    //aqui ele percorre cada fileira, enquanto o numero de fileiras for menor que o definido, que são 6
    for (let n = 1; n <= porFileira; n++) {
      //aqui é a mesma coisa de cima, enquanto o numero de cadeiras for menor que a quantidade permitida por fileiras, ele percorrerá o array adicionando mais 1
      cadeiras.push({ numeracao: `${fileiras}[f]${n}` });
      //e por fim, ele chama a função cadeiras e coloca a numeração de cada cadeira que é igual ao numero da fileira (f) + o numero da cadeira (n)
    }
  }
  return cadeiras;
}
