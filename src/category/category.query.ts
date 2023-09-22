export const GET_ALL_QUERY = `
select service_procedure.get_all_category()
`;

export const GET_ONE_QUERY = `
select service_procedure.get_one_category($1)
`;

export const CREATE_CATEGORY = `
call service_procedure.create_category($1,$2,$3);
`;

export const UPDATE_CATEGORY = `
call service_procedure.update_category($1,$2)
`;

export const DELETE_CATEGORY = `
call service_procedure.deleted_category($1,$2,$3)
`;
