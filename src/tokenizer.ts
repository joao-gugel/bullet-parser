import { Tokens } from "./tokens";

/**
 * Extract program tokens
 */
class Tokenizer {
    private _expression: string;
    private _cursor = 0;

    init(expression: string) {
        this._expression = expression;
    }

    private hasMoreTokens() {
        return this._cursor < this._expression.length;
    }

    public getNextToken() {
        if (!this.hasMoreTokens()) return null;

        const expression = this._expression.slice(this._cursor);

        /**
         * Numbers
         */
        if (!Number.isNaN(+expression[0])) {
            let number = "";

            while (!Number.isNaN(+expression[this._cursor])) {
                number += expression[this._cursor];
                this._cursor++;
            }

            return {
                type: Tokens.NUMBER,
                value: number,
            };
        }

        /**
         * Strings
         */
        if (expression[0] === '"') {
            let s: string[] = [];

            do {
                s.push(expression[this._cursor++]);
            } while (expression[this._cursor] !== '"' && !this.isEndOfFile());

            this._cursor++;

            return {
                type: Tokens.STRING,
                value: s.join(""),
            };
        }

        return null;
    }

    private isEndOfFile() {
        return this._cursor === this._expression.length;
    }
}

export { Tokenizer };
