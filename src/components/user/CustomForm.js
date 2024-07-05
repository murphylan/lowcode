import React from 'react';
import { Element, useNode } from '@craftjs/core';
import { Button as MuiButton, TextField } from '@material-ui/core';
import { Container } from "./Container";

const Input = ({ placeholder, type }) => {
  const { connectors: { connect, drag } } = useNode();

  return (
    <TextField
      ref={ref => connect(drag(ref))}
      type={type}
      placeholder={placeholder}
      variant="outlined"
      fullWidth
      margin="normal"
      name="inputField"  // Added name attribute for identification in FormData
    />
  );
};

const Button = ({ text, onClick }) => {
  const { connectors: { connect, drag } } = useNode();

  const handleClick = () => {
    const formData = new FormData(document.getElementById('form'));
    const formDataObject = {};
    formData.forEach((value, key) => {
      formDataObject[key] = value;
    });
    onClick(formDataObject);
  };

  return (
    <MuiButton
      ref={ref => connect(drag(ref))}
      onClick={handleClick}
      variant="contained"
      color="primary"
    >
      {text}
    </MuiButton>
  );
};

const Form = ({ children }) => {
  const { connectors: { connect, drag } } = useNode();

  return (
    <form id="form" ref={ref => connect(drag(ref))}>
      {children}
    </form>
  );
};

const CustomForm = ({ background, padding = 20 }) => {

  const handleClick = (formData) => {
    console.log('Form Data:', formData);
  };

  return (
    <Container background={background} padding={padding}>
      <Element is={Form} id="form" canvas>
        <Element
          is={Input}
          id="input"
          placeholder="Enter text"
          type="text"
        />
        <Element
          is={Button}
          id="button"
          text="Submit"
          onClick={handleClick}
        />
      </Element>
    </Container>
  );
};

export { Button, CustomForm, Form, Input };
