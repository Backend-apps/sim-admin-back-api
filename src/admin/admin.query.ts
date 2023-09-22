export const GET_ALL_QUERY: string = `
select service_procedure.get_all_admin($1)
`;

export const GET_ONE_QUERY = `
select service_procedure.get_one_admin($1,$2)
`;

export const LOGIN: string = `
select service_procedure.login_admin($1)
`;

export const REGISTER: string = `
call service_procedure.create_admin($1,$2,$3);
`;

export const UPDATED_ADMIN: string = `
call service_procedure.update_admin($1,$2)
`;

export const DELETE_ADMIN: string = `
call service_procedure.delete_admin($1,$2,$3)
`;
