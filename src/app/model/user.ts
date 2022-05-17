import { RoleType } from './role-type';


export interface User {

	id: number,
	role: RoleType,
	userName: string,
	userPassword: string,
	userEmail: string,
	sessionId: string

}
