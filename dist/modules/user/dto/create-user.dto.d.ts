export default class CreateUserDto {
    phoneNumber: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    verifyCode?: string;
    appleId?: string;
    googleId?: string;
    facebookId?: string;
}
