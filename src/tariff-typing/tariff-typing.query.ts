export const GET_ALL_QUERY = `
select service_procedure.get_all_tariff_typing()
`;

export const GET_ONE_QUERY = `
select service_procedure.get_one_tariff_typing($1)
`;

export const GET_ALL_TYPING =`
select service_procedure.get_all_tariffs($1)
`

// export const GET_ALL_TYPING =`
// select service_procedure.get_all_category_paket()
// `

export const CREATE_QUERY = `
call service_procedure.create_tariff_typing($1,$2,$3)
`;

export const UPDATE_QUERY = `
call service_procedure.update_tariff_typing($1,$2)
`;

export const DELETE_QUERY = `
call service_procedure.deleted_tariff_typing($1,$2,$3)
`;
