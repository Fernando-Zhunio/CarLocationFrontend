export interface IUser {
    isAuthenticated:     boolean;
    id:                  string;
    userName:            string;
    name:                null;
    surName:             null;
    phoneNumber:         null;
    phoneNumberVerified: boolean;
    email:               string;
    emailVerified:       boolean;
    tenantId:            null;
    roles:               any[];
}

export interface IUserCurrent {
    isAuthenticated:     boolean;
    id:                  string;
    userName:            string;
    name:                null;
    surName:             null;
    phoneNumber:         null;
    phoneNumberVerified: boolean;
    email:               string;
    emailVerified:       boolean;
    tenantId:            null;
    roles:               any[];
}