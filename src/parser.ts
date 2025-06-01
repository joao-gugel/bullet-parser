import { NodeType } from "./node-type";
import { Tokenizer } from "./tokenizer";
import { Tokens } from "./tokens";

/**
 * Creates an AST
 */
class Parser {
    private _expression: string;
    private _lookahead: { type: string; value: string } | null;

    constructor(private readonly _tokenizer: Tokenizer) {}

    public parse(expression: string) {
        this._expression = expression;
        this._tokenizer.init(expression);

        this._lookahead = this._tokenizer.getNextToken();

        return this.Program();
    }

    /**
     * Main entry point.
     * Program
     *  : NumericLiteral
     *  ;
     */

    public Program() {
        return {
            type: NodeType.Program,
            value: this.Literal(),
        };
    }

    private Literal() {
        switch (this._lookahead?.type) {
            case Tokens.NUMBER:
                return this.NumericLiteral();
            case Tokens.STRING:
                return this.StringLiteral();
        }

        throw new SyntaxError(`Unexpected literal production`);
    }

    private eat(tokenType: string) {
        const token = this._lookahead;

        if (token === null) throw new SyntaxError(`Unexpected end of input, expected: ${tokenType}`);

        if (token.type !== tokenType)
            throw new SyntaxError(`Unexpected token: "${token.value}", expected: ${tokenType}`);

        this._lookahead = this._tokenizer.getNextToken();

        return token;
    }

    /**
     * Numeric Literal
     *  : NUMBER
     *  ;
     */

    private NumericLiteral() {
        const token = this.eat(Tokens.NUMBER);

        return {
            type: NodeType.NumericLiteral,
            value: Number(token.value),
        };
    }

    /**
     * String Literal
     *  : STRING
     *  ;
     */

    private StringLiteral() {
        const token = this.eat(Tokens.STRING);

        return {
            type: NodeType.StringLiteral,
            value: token.value.slice(1, -1),
        };
    }
}

export { Parser };
