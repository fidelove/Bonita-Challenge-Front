export interface LoggedUser {
	id: number,
	role: RoleType,
	name: string,
	userPassword: string,
	userEmail: string,
	sessionId: string
}

export interface AbstractItem {
	id: number,
	name: string
}

export interface User extends AbstractItem {
	role: RoleType,
	userPassword: string,
	userEmail: string
}

export enum RoleType {
	ADMIN = 'ADMIN',
	CHEF = 'CHEF',
	USER = 'USER',
}

export interface Ingredient {
	id: number,
	ingredient: string
}

export interface Keyword {
	id: number,
	keyword: string
}

export interface Comment {
	id: number,
	comment: string,
	created: string
}

export interface Recipe extends AbstractItem {
	author: User,
	ingredients: Array<Ingredient>,
	keywords: Array<Keyword>,
	comments: Array<Comment>
}
