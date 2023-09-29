export const GET_ALL = `
select service_procedure.get_all_package_counter_month();
`;

export interface MonthlyStatistic {
  package_counter_id: number;
  device_id: string;
  device_name: string;
  have_notification: number;
  order_date: string;
  category_id: number;
  name: string;
  company_name: string;
  status: number;
  paket_id: number;
  count: null | number;
  time: null | string;
  price: number;
  description: string;
  deadline: number;
  from_date: string;
  end_date: string;
  internet_type: string;
  package_name: string;
  sale: number | null;
  type: string;
  ussd_code: string;
  month_id: number;
  start_date: string;
  finish_date: string;
  package_total_count: number;
}
