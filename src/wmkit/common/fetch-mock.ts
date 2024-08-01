// 生成随机数
const randomName = () => `数据${Math.random()}`;

/**
 * 查询详情
 * @param url
 * @param params
 */
const fetchDetail = async (url: string, params: any) => {
  return {};
};

/**
 * 查询分页列表
 * @param url
 * @param params
 */
const fetchPageList = async (url: string, params: any) => {
  let list = Array(10)
    .fill(0)
    .map((_i, idx) => {
      return {id: idx, title: randomName()};
    });
  return {
    dataList: list,
    total: 10,
  };
};

/**
 * 查询列表
 * @param url
 * @param params
 */
const fetchList = async (url: string, params: any) => {
  return [
    {id: 1, title: '数据1'},
    {id: 2, title: '数据2'},
    {id: 3, title: '数据3'},
    {id: 4, title: '数据4'},
    {id: 5, title: '数据5'},
    {id: 6, title: '数据6'},
    {id: 7, title: '数据7'},
    {id: 8, title: '数据8'},
    {id: 9, title: '数据9'},
    {id: 10, title: '数据10'},
    {id: 11, title: '数据11'},
    {id: 12, title: '数据12'},
  ];
};

export default {
  fetchDetail,
  fetchPageList,
  fetchList,
};
