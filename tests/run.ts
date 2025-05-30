import { Parser } from "../src/parser";

const parser = new Parser();

const program = "10";

const ast = parser.parse(program);

console.log(JSON.stringify(ast, null, 2));
