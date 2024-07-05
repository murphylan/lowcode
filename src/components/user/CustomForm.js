import { Element, useNode } from '@craftjs/core';
import { Button as MuiButton, TextField } from '@material-ui/core';
import React from 'react';
import { Container } from "./Container";

const Input = ({ placeholder, type }) => {
  const { connectors: { connect, drag } } = useNode();

  return (
    <TextField ref={ref => connect(drag(ref))} type={type} placeholder={placeholder} variant="outlined" fullWidth margin="normal" />
  );
};

const Button = ({ text, onClick }) => {
  const { connectors: { connect, drag } } = useNode();

  return (
    <MuiButton ref={ref => connect(drag(ref))} onClick={onClick} variant="contained" color="primary">
      {text}
    </MuiButton>
  );
};

const Form = ({ children }) => {
  const { connectors: { connect, drag } } = useNode();

  return (
    <form ref={ref => connect(drag(ref))}>
      {children}
    </form>
  );
};

const CustomForm = ({ background, padding = 20 }) => {
  return (
    <Container background={background} padding={padding}>
      <Element is={Form} id="form" canvas>
        <Element is={Input} id="input" placeholder="Enter text" type="text" />
        <Element is={Button} id="button" text="Submit" onClick={() => console.log('Button clicked!')} />
      </Element>
    </Container>
  );
};

export { Button, CustomForm, Form, Input };

