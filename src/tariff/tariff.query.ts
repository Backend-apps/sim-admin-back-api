export const GET_ALL_QUERY = `
select service_procedure.get_all_tariff()
`;

export const GET_ALL_TARIFFS_CATEGORY:string = `
select service_procedure.get_all_category_tariff()
`

export const GET_ONE_QUERY = `
select service_procedure.get_one_tariff($1)
`;

export const CREATE_TARIFF = `
call service_procedure.create_tariff($1,$2,$3)
`;

export const UPDATED_TARIFF = `
call service_procedure.update_tariff($1,$2)
`;

export const DELETE_TARIFF = `
call service_procedure.deleted_tariff($1,$2,$3)
`
