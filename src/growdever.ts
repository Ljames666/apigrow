import { v4 as uuidGen } from "uuid";

class Growdever {
  constructor(
    public id: string,
    public nome: string,
    public idade: number,
    public turma: number,
    public techs: string[],
    public cidade: string
  ) {}
}

interface Return {
  ok: boolean;
  message: string;
  data?: any;
}

function isThereAnyMissingFields(list: any[]) {
  for (let item of list) {
    if (!item) {
      return true;
    }
  }

  return false;
}

function create(
  nome: string,
  idade: number,
  turma: number,
  techs: string[],
  cidade: string
): Return {
  let missingField = isThereAnyMissingFields([nome, idade, turma, techs, cidade]);
  if (missingField) {
    return {
      ok: false,
      message: "Missing fields",
    };
  }

  let growdever: Growdever = new Growdever(uuidGen(), nome, idade, turma, techs, cidade);
  growdevers.push(growdever);

  return {
    ok: true,
    message: "Growdever was successfully created",
    data: growdever,
  };
}

function update(id: string, idade: number, techs: string[]): Return {
  let indexGrowdever = growdevers.findIndex((item) => item.id == id);
  if (indexGrowdever < 0) {
    return {
      ok: false,
      message: "Growdever not found",
    };
  }

  growdevers[indexGrowdever].techs = techs;
  growdevers[indexGrowdever].idade = idade;

  return {
    ok: true,
    message: "Growdever was succssfully updated",
    data: growdevers[indexGrowdever],
  };
}

async function get(turma?: number) {
  return {
    ok: true,
    message: "Growdevers were successfully listed",
    data: turma ? growdevers.filter((g) => g.turma == turma) : growdevers,
  };
}

function remove(id: string) {
  let indexGrowdever = growdevers.findIndex((item) => item.id == id);
  if (indexGrowdever < 0) {
    return {
      ok: false,
      message: "Growdever not found",
    };
  }

  growdevers.splice(indexGrowdever, 1);

  return {
    ok: true,
    message: "Growdever was succssfully removed",
    data: growdevers,
  };
}

const growdevers: Growdever[] = [
  new Growdever(uuidGen(), "Joãozinho", 20, 5, ["Node", "API"], "Rosário do Sul"),
  new Growdever(uuidGen(), "Mariazinha", 25, 5, ["HTML", "JS", "CSS"], "POA"),
  new Growdever(uuidGen(), "José", 30, 4, ["HTML", "JS", "CSS", "Node", "API"], "Santa Maria"),
];

export default Growdever;
export { create, get, update, remove, Return };
