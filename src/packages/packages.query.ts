export const GET_ALL_PACKAGE: string = `
select service_procedure.get_all_paket()
`;

export const GET_ONE_PACKAGE: string = `
select service_procedure.get_one_paket($1)
`;

export const CREATED_PACKAGE: string = `
call service_procedure.create_paket($1,$2,$3)
`;

export const UPDATE_PACKAGE: string = `
call service_procedure.update_paket($1,$2)
`;

export const DELETE_PACKAGE: string = `
call service_procedure.deleted_paket($1,$2,$3)
`;

export const GET_ALL_PACKAGE_QUERY: string = `
select service_procedure.get_all_category_paket()
`;
