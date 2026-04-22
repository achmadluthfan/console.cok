// ======= 🥚 Phase 1 — Basic CLI (Entry Point) =======
import parser from "@babel/parser";

function parseToAST(code) {
  const parseResult = parser.parse(code, {
    sourceType: "module",
  });

  return parseResult;
}

export default parseToAST;
