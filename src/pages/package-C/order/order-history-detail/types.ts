


export interface DataProps {
  loading: boolean; 
  list:any[];
  pageNum:number;
  pageSize:number;
  total:number;
  reload:boolean;
  order:any;
  goodsItems:any[];
}
export type MyContextProps = {
  state: DataProps;
  setState: SetState<DataProps>;
};