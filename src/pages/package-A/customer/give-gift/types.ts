


export interface DataProps {
  laoding: boolean;
  balance:number;
  remark:string;
  amount:number;
  visible:boolean;
  redPacketInfo:any
}
export type MyContextProps = {
  state: DataProps;
  setState: SetState<DataProps>;
};