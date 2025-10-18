import EBNF from "ebnf/dist/Grammars/W3CEBNF"
import { IToken } from "ebnf"
import { jsonQueryGrammar } from "./jsonQueryGrammar"

const valid = /(children|text|type|start|end|rest|errors|fullText|\d+)/
const subset = /(children|text|type|\d+)/
const toJSON: any = (ast: any) => JSON.stringify(ast, (key, value) => (key === "" || valid.test(key) ? value : undefined), 2)
const toSmallJSON = (ast: any) => JSON.stringify(ast, (key, value) => (key === "" || (key === "rest" && value !== "") || subset.test(key) ? value : undefined), 2)

const parserLocal: any = new EBNF.Parser(jsonQueryGrammar)

export const parse: any = (query: any): IToken => parserLocal.getAST(query)
export const reduce: any = (ast: IToken) => JSON.parse(toSmallJSON(ast))
export { toJSON }
