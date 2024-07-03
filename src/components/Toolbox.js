import React from "react";
import { Box, Typography, Grid, Button as MaterialButton } from "@material-ui/core";
import { Element, useEditor } from "@craftjs/core";
import { Container } from "./user/Container";
import { Card } from "./user/Card";
import { Button } from "./user/Button";
import { Text } from "./user/Text";

export const Toolbox = () => {
  const { connectors, query } = useEditor();

  return (
    <Box px={2} py={2}>
      <Grid container direction="column" alignItems="center" justifyContent="center" spacing={1}>
        <Box pb={2}>
          <Typography>拖动以添加</Typography>
        </Box>
        <Grid container direction="column" item>
          <MaterialButton ref={ref => connectors.create(ref, <Button text="点击我" size="small" />)} variant="contained">按钮</MaterialButton>
        </Grid>
        <Grid container direction="column" item>
          <MaterialButton ref={ref => connectors.create(ref, <Text text="你好，世界" />)} variant="contained">文本</MaterialButton>
        </Grid>
        <Grid container direction="column" item>
          <MaterialButton ref={ref => connectors.create(ref, <Element is={Container} padding={20} canvas />)} variant="contained">容器</MaterialButton>
        </Grid>
        <Grid container direction="column" item>
          <MaterialButton ref={ref => connectors.create(ref, <Card />)} variant="contained">卡片</MaterialButton>
        </Grid>
      </Grid>
    </Box>
  )
};
