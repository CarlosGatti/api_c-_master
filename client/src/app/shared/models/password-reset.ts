export class PasswordReset {
    constructor(public newPassword?: string,
                public newPasswordConfirm?: string,
                public oldPassword?: string) {
    }
}
