## ProTable

集成搜索表单，table的列表组件


### demo

```js

import React from 'react';
import { ProTable, useTable } from '@uiw-admin/components';

export default function Demo() {
  const table = useTable('/api/getData', {
    // 格式化接口返回的数据，必须返回{total 总数, data: 列表数据}的格式
    formatData: (data) => {
      return {
        total: data.total,
        data: data.data,
      };
    },
    // 格式化查询参数 会接收到pageIndex 当前页  searchValues 表单数据
    query: (pageIndex: number, searchValues: any) => {
      return {
        page: pageIndex,
        pageSize: 10,
        data: searchValues,
      };
    },
  });

  return (
    <ProTable
      btns={[{ label: '新增', type: 'primary' }]}
      table={table}
      columns={[
        {
          title: '名字',
          key: 'name',
          props: {
            widget: 'input',
            initialValue: 'zzz',
            // 组件属性
            widgetProps: {
              preIcon: 'user',
              placeholder: '输入用户名',
            },
          },
        },
        {
          title: '年龄',
          key: 'age',
          props: {
            widget: 'select',
            option: [
              { label: '20', value: 20 },
              { label: '10', value: 10 },
            ],
          },
        },
        {
          title: '地址',
          key: 'info',
          props: {
            widget: 'textarea',
          },
        },
        {
          title: 'Switch',
          key: 'Switch',
          props: {
            widget: 'switch',
          },
        },
        {
          title: 'timePicker',
          key: 'timePicker',
          props: {
            widget: 'timePicker',
          },
        },
        {
          title: 'MonthPicker',
          key: 'MonthPicker',
          props: {
            widget: 'monthPicker',
          },
        },
        {
          title: 'DateInput',
          key: 'DateInput',
          props: {
            widget: 'dateInput',
          },
        },
        {
          title: 'Radio',
          key: 'Radio',
          props: {
            widget: 'radio',
            option: [
              { label: '男', value: 'man' },
              { label: '女', value: 'girl' },
            ],
          },
        },
        {
          title: 'SearchSelect',
          key: 'SearchSelect',
          props: {
            widget: 'searchSelect',
            widgetProps: {
              option: [
                { label: 'a', value: 2 },
                { label: 'aa', value: 3 },
                { label: 'aaa', value: 4 },
              ],
            },
          },
        },
      ]}
    />
  );
}


```

## Porps

| 参数 | 说明	| 类型	| 默认值 |
| --  | -- | -- | -- |
| columns | 与uiw table colunms用法一致 必传	| ColumnProps[]		| [] |
| btns | 操作栏按钮集合，属性与uiw button一致	| ButtonProps[]		| [] |
| table | useTable返回值	| Object 必传		|  |

### columns props

配置搜索表单


| 参数 | 说明	| 类型	| 默认值 |
| --  | -- | -- | -- |
| widget | 表单组件	| 	支持例子中的组件, 组件名与uiw表单组件名字一致，只是首字母小写了	| - |
| widgetProps | 组件属性	| 	与uiw对应的组件属性一致	| - |
| label| 表单标题，如果不填则集成columns title	| 	String	| - |
| key| 表单name，如果不填则集成columns key	| 	String	| - |

## useTable

### params


| 参数 | 说明	| 类型	| 默认值 |
| --  | -- | -- | -- |
| key | 接口请求地址	| string		| - |
| options | 配置集合	| object		| {} |

### options

| 参数 | 说明	| 类型	| 默认值 |
| --  | -- | -- | -- |
| formatData | 格式化接口返回的数据，必须返回{total: 总数, data: 列表数据}的格式	| (data) => {total: 10, data: []}	| - |
| query | 格式化请求参数, 会接收到pageIndex 当前页  searchValues 表单数据	|  (pageIndex: number, searchValues: any)	=> {page:  pageIndex, pageSize: 10, searchValues}	| {} |


### response

| 参数 | 说明	| 类型	| 默认值 |
| --  | -- | -- | -- |
| data | 接口请求数据	| Array	| - |
| total | 数据总数	| Number		| - |
| searchValues | 表单值	| Object		| - |

别的值咱不需要使用