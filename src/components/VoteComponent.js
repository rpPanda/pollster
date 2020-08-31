import React, { useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Button,
} from "reactstrap";
import { Link } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import { Loading } from "./LoadingComponent";

// import { Fade, Stagger } from "react-animation-components";
// import { Loading } from "./LoadingComponent";
// import { baseUrl } from "../shared/baseUrl";

function Vote(props) {
  const [voteCount, setVoteCount] = useState(
    Array(props.dishes.dishes.length).fill(0)
  );
  const [selected, setSelected] = useState(0);
  const labels = (dishes) => {
    var labels = [];
    for (var i in dishes) {
      labels.push(dishes[i].name);
    }
    return labels;
  };
  //const [voteList,setVoteList] = useState(props.dishes.dishes);
  const [data, setData] = useState({
    labels: labels(props.dishes.dishes),
    datasets: [
      {
        label: "Number of Votes",
        data: voteCount,
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

  function Graph({ data }) {
    return (
      <Bar
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
    );
  }

  function RenderCard({ i, isLoading, errMess, dish, color }) {
    if (isLoading) {
      return <Loading />;
    } else if (errMess) {
      return <h4>{errMess}</h4>;
    } else
      return (
        <Card
          onClick={() => {
            setSelected(dish.id);
          }}
          inverse
          color={color}
        >
          <CardHeader>{dish.name}</CardHeader>
          <CardBody>Vote for this dish</CardBody>
          <CardFooter>{dish.description}</CardFooter>
        </Card>
      );
  }
  const vote = props.dishes.dishes.map((dish) => {
    var color = "primary";
    if (dish.id === selected) color = "success";
    return (
      <div key={dish.id} className="col-12 col-md-5 m-1">
        <RenderCard
          i={dish.id}
          dish={dish}
          isLoading={props.dishes.isLoading}
          errMess={props.dishes.errMess}
          color={color}
        />
      </div>
    );
  });

  return (
    <div className="container">
      <div className="row">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/home">Home</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>Vote</BreadcrumbItem>
        </Breadcrumb>
        <div className="col-12">
          <h3>Vote</h3>
          <hr />
          <div className="row">{vote}</div>
          <div className="row">
            <Button
              onClick={() => {
                var tempArr = voteCount;
                tempArr[selected] = tempArr[selected] + 1;
                setVoteCount(tempArr);
                setData({ ...data, data: voteCount });
                console.log(props.user[0].id);

                props.postVote(selected, props.user[0].id);
              }}
            >
              Submit
            </Button>
          </div>
          <hr />
          <Graph data={data} />
        </div>
      </div>
    </div>
  );
}

export default Vote;
