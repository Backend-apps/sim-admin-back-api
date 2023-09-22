// export const typeormConfig: any = {
//   type: 'postgres',
//   host: 'localhost',
//   port: 5432,
//   username: 'postgres',
//   password: 'jasur001',
//   database: 'ussd_service_v5',
//   entities: ['dist/**/*.entity{.ts,.js}'],
//   synchronize: true,
// };

export const typeormConfig:any = {
  type: 'postgres',
  host: 'database.coreteam.uz',
  port: 8090,
  username: 'ussd_db',
  password: 'ussd1234@',
  database: 'ussd_db',
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: true,
};
