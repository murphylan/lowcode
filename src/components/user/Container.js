import React from "react";
import { Paper } from "@material-ui/core";
import { useNode } from "@craftjs/core";
import { FormControl, FormLabel, Slider } from "@material-ui/core";
import ColorPicker from 'material-ui-color-picker'


export const Container = ({ background, padding = 0, children }) => {
  const { connectors: { connect, drag } } = useNode();
  return (
    <Paper ref={ref => connect(drag(ref))} style={{ background, padding: `${padding}px` }}>
      {children}
    </Paper>
  )
}

export const ContainerSettings = () => {
  const { background, padding, actions: { setProp } } = useNode(node => ({
    background: node.data.props.background,
    padding: node.data.props.padding
  }));
  return (
    <div>
      <FormControl fullWidth={true} margin="normal" component="fieldset">
        <FormLabel component="legend">Background</FormLabel>
        <ColorPicker defaultValue={background || '#000'} onChange={color => {
          setProp(props => props.background = color)
        }} />
      </FormControl>
      <FormControl fullWidth={true} margin="normal" component="fieldset">
        <FormLabel component="legend">Padding</FormLabel>
        <Slider defaultValue={padding} onChange={(_, value) => setProp(props => props.padding = value)} />
      </FormControl>
    </div>
  )
}

// 我们导出这个，因为我们会在 Card 组件中使用它
export const ContainerDefaultProps = {
  background: "#ffffff",
  padding: 3
};

Container.craft = {
  props: ContainerDefaultProps,
  related: {
    settings: ContainerSettings
  }
}