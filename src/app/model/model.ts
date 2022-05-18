export interface LoggedUser {
	id: number,
	role: RoleType,
	userName: string,
	userPassword: string,
	userEmail: string,
	sessionId: string
}

export interface User {
	id: number,
	role: RoleType,
	userName: string,
	userPassword: string,
	userEmail: string
}

export enum RoleType {
	ADMIN = 'ADMIN',
	CHEF = 'CHEF',
	USER = 'USER',
}
