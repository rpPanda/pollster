import React, { useState } from "react";
import {
  Col,
  Button,
  Form,
  FormFeedback,
  FormText,
  FormGroup,
  Label,
  Input,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";
import { Link } from "react-router-dom";
import { useFormFields } from "../libs/hooksLib";

const required = (val) => val && val.length;
const maxLength = (len,val) => !val || val.length <= len;
const minLength = (len,val) => val && val.length >= len;


const CreatePoll = (props) => {
    const [options, setOptions] = useState(["option 0"]);
    const [fields, handleFieldChange] = useFormFields({
        exampleText: "",
    }); 
    function addOption(event) {
      event.preventDefault();
      console.log(fields);  
      setOptions(options.concat("option " + options.length));
    }

  return (
    <div className="container">
      <Breadcrumb>
        <BreadcrumbItem>
          <Link to="/home">Home</Link>
        </BreadcrumbItem>
        <BreadcrumbItem active>Create Poll</BreadcrumbItem>
      </Breadcrumb>
      <div className="p-5 m-2 border border-primary rounded">
        <div className="col-12">
          <h3>Create Poll</h3>
          <hr />
        </div>
        <Form>
          <FormGroup row>
            <Label for="exampleSelect" sm={2}>
              Select
            </Label>
            <Col sm={10}>
              <Input type="select" name="select" id="exampleSelect">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </Input>
              <FormText>Select poll type</FormText>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="exampleText" sm={2}>
              Text Area
            </Label>
            <Col sm={10}>
              <Input
                type="textarea"
                name="text"
                id="exampleText"
                onChange={handleFieldChange}
              />
              <FormText>Write your Question here</FormText>
            </Col>
          </FormGroup>
          <>
            {options.map((option) => {
              var valid = required(fields[option]) && maxLength(30, fields[option]);
              return (
                <FormGroup row key={option}>
                  <Label for="option" sm={2}>
                    {option}
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="text"
                      name="options"
                      id={option}
                      onChange={handleFieldChange}     
                      valid={valid}
                      invalid={!valid}
                    />
                    <FormFeedback invalid>Option must be between 1-30 chracters</FormFeedback>
                  </Col>
                </FormGroup>
              );
            })}
          </>
          <FormGroup row>
            <Col sm={{ size: 10, offset: 2 }}>
              <Button onClick={addOption}><span className="fa fa-plus fa-lg" >
                {' '}Add Option
          </span></Button>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="public" sm={2}>
              Public
            </Label>
            <Col sm={{ size: 10 }}>
              <FormGroup check>
                <Label check>
                  <Input type="checkbox" id="public" /> Yes
                </Label>
              </FormGroup>
            </Col>
          </FormGroup>
          <FormGroup check row>
            <Col sm={{ size: 10, offset: 2 }}>
              <Button>Submit</Button>
            </Col>
          </FormGroup>
        </Form>
      </div>
    </div>
  );
};

export default CreatePoll;
