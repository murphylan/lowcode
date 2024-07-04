import { Grid, Paper, Typography } from '@material-ui/core';
import React from 'react';
import { SettingsPanel } from './components/SettingsPanel';
import { Toolbox } from './components/Toolbox';
import { Topbar } from './components/Topbar';
import { Card, CardTop, CardBottom } from './components/user/Card';
import { Container } from './components/user/Container';
import { Button } from './components/user/Button';
import { Text } from './components/user/Text';
import { Editor, Frame, Element } from "@craftjs/core";

export default function App() {
  return (
    <div style={{ margin: "0 auto", width: "100%", maxWidth: "1200px" }}>
      <Typography variant="h5" align="center">低代码编辑器</Typography>
      <Editor resolver={{ Card, Button, Text, CardTop, CardBottom, Container }}>
        <Topbar />
        <Grid container spacing={3} style={{ paddingTop: "10px", height: '80vh' }}>
          <Grid item xs={2} style={{ height: '100%' }}>
            <Paper style={{ height: '100%' }}>
              <Toolbox />
            </Paper>
          </Grid>
          <Grid item xs={8} style={{ height: '100%' }}>
            <Frame>
              <Element is={Container} padding={5} background="#eee" canvas> // Canvas 类型的 Container 节点，可放置
                <Card /> // Card 类型的节点
                <Button size="small" variant="outlined">点击</Button> // Button 类型的节点，可拖拽
                <Text size="small" text="你好，世界！" /> // Text 类型的节点，可拖拽
                <Element is={Container} padding={2} background="#999" canvas> // Canvas 类型的 Container 节点，可放置和拖拽
                  <Text size="small" text="又是我！" /> // Text 类型的节点，可拖拽
                </Element>
              </Element>
            </Frame>
          </Grid>
          <Grid item xs={2} style={{ height: '100%' }}>
            <Paper style={{ height: '100%' }}>
              <SettingsPanel />
            </Paper>
          </Grid>
        </Grid>
      </Editor>
    </div>
  );
}
