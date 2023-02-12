// export interface Asset{
//   raw_data: {[key: string]: number},
//   data_adjusted_by_currency: {[key: string]: number},
//   net_data_adjusted_by_currency: {[key: string]: number},

//   data_categorized_by_asset: {[key: string]: number},
//   net_data_categorized_by_asset: {[key: string]: number},

//   data_categorized_by_asset_type: {[key: string]: number},
//   net_data_categorized_by_asset_type: {[key: string]: number},

//   data_categorized_by_account: {[key: string]: number},
//   net_data_categorized_by_account: {[key: string]: number},

//   data_categorized_by_currency: {[key: string]: number},
//   net_data_categorized_by_currency: {[key: string]: number},
  
//   total_asset_amount_in_hkd: number
// }

export interface Asset{
  asset_type: string,
  currency: string,
  account: string,
  value: number,
  mark: string,
  normalized_value: number
}
