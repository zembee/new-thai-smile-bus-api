export default class UserResponseDto {
    objectId?: string;
    phoneNumber?: string;
    email?: string;
    roles: string[];
    firstName?: string;
    lastName?: string;
    lastLogin?: Date;
    appleId?: string;
    googleId?: string;
    facebookId?: string;
}
