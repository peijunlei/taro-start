### listview组件  
- listview只负责调接口，不负责list渲染（但是负责底图渲染和加载完成状态提示）
- getdata方法用于获取数据，获取list之后赋值到当前页面store或者state，map之后的列表作为插槽传入  
- 触发页面listview更新有更改params和reload（reload初始值请选择false）  
- 其他功能和h5版本listview基本一致，具体参考店铺关注页面  
- 注意指定高度
#### 参数说明

 - params?: Object; //搜索参数
 - style?: any;  //scroll-view样式
 - height?: any; //用于指定高度,不填写默认100vh
 - noneImg?: string; //为空图片
 - noneContent?: string; //为空提示

 - url: string; //接口url
 - dataPath?: Array<string>; //取数据的路径，从context到content的路径（无需包含context,content）
 - dataPreProcessing?: Function; //数据预处理，获取list之后如果需要部分添加修改可以写在这里，返回list
 - getData: Function; //回调获取list和total，自行放入父组件的list，自行map
 - otherProps?: Array<Array<string>>;
 - reload?: boolean;//用于强制listview刷新