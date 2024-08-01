


export interface DataProps {
  id:string;
  cityId: string,
  brandId:string,
  latitude: string,
  longitude: string,
  loading: boolean; 
  list:any[];
  pageNum:number;
  pageSize:number;
  total:number;
  reload:boolean;
}
export type MyContextProps = {
  state: DataProps;
  setState: SetState<DataProps>;
};