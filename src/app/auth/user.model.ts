export class User {
    constructor(
        public email: string,
        public userId: string,
        private _token: string,
        private _tokenExpirationDate: Date,
        private username: string
    ) {}

    get token() {
        return this._token;
    }
}
