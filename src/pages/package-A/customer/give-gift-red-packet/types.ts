


export interface DataProps {
  grantAmount: number,
  grantCustomerImg: string,
  grantCustomerName: string,
  grantMsg: string,
  grantState: number;
  drawCustomerId:string;
  /**
   * 红包的企业id
   */
  grantCompanyId:string;

}
export type MyContextProps = {
  state: DataProps;
  setState: SetState<DataProps>;
};