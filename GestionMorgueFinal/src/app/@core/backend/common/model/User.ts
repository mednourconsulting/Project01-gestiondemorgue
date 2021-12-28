export class User {
    constructor(
        public id?: number,
        public email?: string,
        public passwordHash?: string,
        public userName?: string,
        public isDeleted?: false,
        public firstName?: string,
        public lastName?: string,
        public roles?: string,
    ) {}
}
