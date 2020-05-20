import React, { useState, useEffect } from 'react';
import { Table, Button, Input } from '@alifd/next';

import './index.scss';

const result = [{
  id: 1,
  name: '老人与海',
  subName: 'The Old Man and the Sea',
}, {
  id: 2,
  name: '了不起的盖茨比',
  subName: 'the great gatsby',
}, {
  id: 3,
  name: '鲁宾逊漂流记',
  subName: 'The adventures of Robinson Crusoe',
}];

export default function DroneAddableForm() {
  const [ data, setData ] = useState(result)
  const [ editingIds, setEditingIds ] = useState([])
  const [ curNewId, setCurNewId ] = useState(1)

  // 渲染可编辑的单元格
  function renderEditableCell(value, index, record, key) {
    if (editingIds.includes(record.id)) {
      return <Input value={value} onChange={(val) => { handleInput(val, index, record, key) }} />
    } else {
      return value
    }
  }

  // input 输入时的事件
  function handleInput(val, index, record, key) {
    data[index][key] = val
    setData([...data])
  }

  // 渲染操作列的单元格
  function renderOperation(value, index, record) {
    const { id } = record
    if (editingIds.includes(id)) {
      return (
        <div className="operation-wrap">
          <span onClick={() => { handleSave(id) }}>保存</span>
        </div>
      )
    } else {
      return (
        <div className="operation-wrap">
          <span onClick={() => { handleEdit(id) }}>编辑</span>
          <span onClick={() => { handleDelete(id) }}>删除</span>
        </div>
      )
    }
  }

  // 添加按钮点击事件
  function handleAdd() {
    const newId = `new-${curNewId}`
    const newRecord = {
      id: newId,
      name: '',
      subName: '',
    }
    setData([...data, newRecord])
    handleEdit(newId)
    // 防止 id 重复，需要每次新增时递增
    setCurNewId(curNewId + 1)
  }

  // 进入编辑状态
  function handleEdit(id) {
    setEditingIds([...editingIds, id])
  }

  // 保存按钮点击事件
  function handleSave(id) {
    // 这里一般需要与服务端进行交互，下面是纯前端的 demo
    const editingData = data.filter(item => item.id === id)[0] || {}
    console.log('当前正在保存的值为：', editingData)
    // 这里可以进行校验、格式处理、发送请求等操作
    // fetch('xxx')...
    // 退出编辑状态
    setEditingIds(editingIds.filter(item => item !== id))
  }

  // 删除按钮点击事件
  function handleDelete(id) {
    // 这里一般需要与服务端进行交互，下面是纯前端的 demo
    setData(data.filter(item => item.id !== id))
  }

  return (
    <div className="DroneAddableForm">
      <Button className="add-button" onClick={handleAdd}>新增一行</Button>
      <Table dataSource={data} hasBorder={false} >
        <Table.Column title="中文名" dataIndex="name"  cell={(value, index, record) => renderEditableCell(value, index, record, 'name')}/>
        <Table.Column title="英文名" dataIndex="subName" cell={(value, index, record) => renderEditableCell(value, index, record, 'subName')}/>
        <Table.Column title="操作" cell={renderOperation}/>
      </Table>
    </div>
  );
}
