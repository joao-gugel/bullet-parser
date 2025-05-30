import { Tokenizer } from "../src/tokenizer";
import { Parser } from "../src/parser";

const tokenizer = new Tokenizer();
const parser = new Parser(tokenizer);

const program = `"hello"`;

const ast = parser.parse(program);

console.log(JSON.stringify(ast, null, 2));
