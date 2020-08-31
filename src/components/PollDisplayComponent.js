import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardText,
  CardFooter,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { Link } from "react-router-dom";
import { Bar, Pie } from "react-chartjs-2";
import { useFormFields } from "../libs/hooksLib";

// const pollData = {
//   key: "12-12",
//   name: "firstPoll",
//   question: "Just a random question. What would you pick?",
//   options: ["option 0", "option 1", "option 2"],
//   pollType: "Single",
//   type: "poll",
//   userId: "123-123",
//   votes: [5, 4, 10],
// };

const PollDisplay = (props) => {
  useEffect(()=> {
    props.fetchPoll(props.pollId)
  })
  const [fields, handleFieldChange] = useFormFields({
  });
  const [hasVoted, setHasVoted] = useState(false);
  const [data, setData] = useState({
    labels: props.poll.poll.options,
    datasets: [
      {
        label: "Number of Votes",
        data: props.poll.poll.votes,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(54, 162, 235, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(54, 162, 235, 0.2)",
        ],
        borderWidth: 2,
      },
    ],
  });
  if(props.poll.isLoading){
    return (
      <div>Loading...</div>
    )
  }
  else if(props.poll.errMess)
  return (
  <div>{props.poll.errMess}</div>
  )
  console.log(props.poll, props.pollId)
  // const labels = (dishes) => {
  //   var labels = [];
  //   for (var i in dishes) {
  //     labels.push(dishes[i].name);
  //   }
  //   return labels;
  // };
  //const [voteList,setVoteList] = useState(props.dishes.dishes);
  

  function RenderOptions({ options }){
    var i=0;
    return options.map((option) => {     
      return (
          <FormGroup check key={i}>
            <Label check>
            <Input type="radio" value={i} id="option" name="option" disabled={hasVoted} onChange={handleFieldChange} checked = {fields["option"] === String(i++)}/> {option}
            </Label>
          </FormGroup>
      )
    })
  }

  function Graph({ data }) {
    return (
      <>
      <Bar className="mb-5"
        data={data}
        options={{
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
        }}
      />
      <Pie
        data={data}
      />
      </>
    );
  }

  function onSubmit(event){
    event.preventDefault();
    props.poll.poll.votes[fields.option]++;
    setHasVoted(true);
    setData({ ...data, data: props.poll.poll.votes})
  }
    
    return (
      <div className="container">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/home">Home</Link>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Link to="/poll">Poll</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>{props.poll.poll.name}</BreadcrumbItem>
        </Breadcrumb>
        <div className="p-5 m-2 border border-primary rounded">
          <div className="col-12">
            <h3>Poll</h3>
            <hr />
          </div>
          <Card body inverse color="primary">
            <CardHeader>{props.poll.poll.name}</CardHeader>
            <CardBody>
              <CardTitle>Poll Type : {props.poll.poll.pollType}</CardTitle>
              <CardText>
                <em>{props.poll.poll.question}</em>
              </CardText>
              <Form onSubmit={onSubmit}>
                <FormGroup tag="fieldset" row>
                  <legend className="col-form-label col-sm-2">
                    Options
                  </legend>
                  <Col sm={10}>
                    <RenderOptions options={props.poll.poll.options}/>
                  </Col>
                </FormGroup>
                <FormGroup check row>
                  <Col sm={{ size: 8, offset: 0 }}>
                    {!hasVoted && <Button>Submit</Button>}
                  </Col>
                </FormGroup>
              </Form>
            </CardBody>
            <CardFooter>Created by : {props.poll.poll.userId}</CardFooter>
          </Card>
          {hasVoted && <Graph data={data} />}
        </div>
      </div>
    );
}

export default PollDisplay;