export interface User {
	id: number;
	email: string;
	created_at: string;
	updated_at: string;
	user_data: {
		id: number;
		name: string;
		surname: string;
		user_id: number;
	};
}
