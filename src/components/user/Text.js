import { useNode } from '@craftjs/core';
import { FormControl, FormLabel, Slider } from "@material-ui/core";
import React, { useState } from 'react';
import ContentEditable from 'react-contenteditable';

// 定义 Text 组件
export const Text = ({ text, fontSize, textAlign }) => {
  // 使用 useNode 钩子获取节点信息和方法
  const { connectors: { connect, drag }, isActive, actions: { setProp } } = useNode((node) => ({
    isActive: node.events.selected
  }));

  // 定义本地状态 editable 用于控制文本是否可编辑
  const [editable, setEditable] = useState(false);

  return (
    // 包装 ContentEditable 组件，提供拖拽和点击功能
    <div
      ref={ref => connect(drag(ref))} // 连接拖拽功能
      onClick={e => setEditable(true)} // 点击时使文本变为可编辑状态
    >
      <ContentEditable
        html={text} // 显示的文本内容
        onChange={e =>
          setProp(props =>
            // 更新文本内容，移除 HTML 标签
            props.text = e.target.value.replace(/<\/?[^>]+(>|$)/g, "")
          )
        }
        tagName="p" // 使用 <p> 标签包裹文本
        disabled={!editable} // 根据状态决定是否禁用编辑功能
        style={{ fontSize: `${fontSize}px`, textAlign }} // 应用字体大小和对齐方式样式
      />
    </div>
  )
}

// 定义 TextSettings 组件，用于编辑 Text 组件的设置
const TextSettings = () => {
  // 使用 useNode 钩子获取节点的属性和方法
  const { actions: { setProp }, fontSize } = useNode((node) => ({
    fontSize: node.data.props.fontSize
  }));

  return (
    <>
      {/* 使用 Material-UI 的表单控件构建字体大小调整 UI */}
      <FormControl size="small" component="fieldset">
        <FormLabel component="legend">Font size</FormLabel>
        <Slider
          value={fontSize || 7} // 设置初始值，如果未定义则为 7
          step={1} // 每次滑动的步长为 1
          min={1} // 最小值为 1
          max={50} // 最大值为 50
          onChange={(_, value) => {
            // 更新字体大小属性
            setProp(props => props.fontSize = value);
          }}
        />
      </FormControl>
    </>
  )
}

// 将 TextSettings 组件关联到 Text 组件
Text.craft = {
  props: {
    text: "Hi",
    fontSize: 20,
    textAlign: "left"
  },
  related: {
    settings: TextSettings
  }
}