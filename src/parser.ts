import { Tokens } from "./tokens";

class Parser {
    private _expression: string;

    public parse(expression: string) {
        this._expression = expression;

        return this.Program();
    }

    /**
     * Main entry point.
     * Program
     *  : NumericLiteral
     *  ;
     */

    public Program() {
        return this.NumericLiteral();
    }

    /**
     * Numeric Literal
     *  : NUMBER
     *  ;
     */

    private NumericLiteral() {
        return {
            type: Tokens.NumericLiteral,
            value: Number(this._expression),
        };
    }
}

export { Parser };
