import React from "react";
import { Text } from "./Text";
import { Button } from "./Button";
import { Container } from "./Container";
import { useNode, Element } from "@craftjs/core";
import { ContainerSettings, ContainerDefaultProps } from "./Container";

// 注意 CardTop 和 CardBottom 没有指定拖动连接器，因为我们不会将这些组件用作可拖动组件；添加拖动处理程序将毫无意义。

export const CardTop = ({ children }) => {
  const { connectors: { connect } } = useNode();
  return (
    <div ref={connect} className="text-only">
      {children}
    </div>
  )
}

CardTop.craft = {
  rules: {
    // 只接受 Text
    canMoveIn: (incomingNodes) => incomingNodes.every(incomingNode => incomingNode.data.type === Text)
  }
}

export const CardBottom = ({ children }) => {
  const { connectors: { connect } } = useNode();
  return (
    <div ref={connect}>
      {children}
    </div>
  )
}

CardBottom.craft = {
  rules: {
    // 只接受 Button
    canMoveIn: (incomingNodes) => incomingNodes.every(incomingNode => incomingNode.data.type === Button)
  }
}

export const Card = ({ background, padding = 20 }) => {
  return (
    <Container background={background} padding={padding}>
      <Element id="text" is={CardTop} canvas> // 类型为 CardTop 的 Canvas 节点
        <Text text="Title" fontSize={20} />
        <Text text="Subtitle" fontSize={15} />
      </Element>
      <Element id="buttons" is={CardBottom} canvas> // 类型为 CardBottom 的 Canvas 节点
        <Button size="small" text="Learn more" />
      </Element>
    </Container>
  )
}

Card.craft = {
  props: ContainerDefaultProps,
  related: {
    // Since Card has the same settings as Container, we'll just reuse ContainerSettings 
    settings: ContainerSettings
  }
}