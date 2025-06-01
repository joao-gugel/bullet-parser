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

        let matched = /^\d+/.exec(expression);

        if (matched) {
            this._cursor += matched[0].length;
            return {
                type: Tokens.NUMBER,
                value: matched[0],
            };
        }

        /**
         * Strings
         */

        matched = /^"[^"]*"/.exec(expression);

        if (matched) {
            this._cursor += matched[0].length;
            return {
                type: Tokens.STRING,
                value: matched[0],
            };
        }

        return null;
    }

    private isEndOfFile() {
        return this._cursor === this._expression.length;
    }
}

export { Tokenizer };
