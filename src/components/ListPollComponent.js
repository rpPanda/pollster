import React from "react";
import {
    Card,
    CardHeader,
    CardBody,
    CardText,
    CardFooter,
    CardTitle,
    Breadcrumb,
    BreadcrumbItem,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
} from "reactstrap";
import { Link } from "react-router-dom";
import { useFormFields } from "../libs/hooksLib";
import { Loading } from './LoadingComponent'
// import { useHistory } from "react-router-dom";

const ListPoll = (props) => {
    const [fields, handleFieldChange] = useFormFields({
        search: "",
    }); 
    function count(votes){
        return votes.reduce(function (a, b) {
            return a + b;
        }, 0);
    }
    function RenderPolls ({polls, search}){
        if(polls.isLoading) return (
            <div className="flex">
            <Loading/>
            </div>
        )
        
        return polls.polls.filter((poll) => {
            if(search === "")
                return poll
            else if (poll.question.toLowerCase().includes(search.toLowerCase()) 
                        || poll.name.toLowerCase().includes(search.toLowerCase()))
                return poll
        })
        .map((poll) => {
            return (
                <Link to={'/poll/' + poll.key} key={poll.key} className="col-12 mt-4" style={{ textDecoration: 'none' }} >
                    <Card inverse color="primary">
                        <CardHeader>{poll.name}</CardHeader>
                        <CardBody>
                            <CardTitle><em>{(poll.question.length>60) ? poll.question.slice(0,60)+'...' : poll.question}</em></CardTitle>
                            <CardText>Poll Type: {poll.type}</CardText>
                        </CardBody>
                        <CardFooter>Poll Count : {count(poll.votes)}</CardFooter>
                    </Card>
                </Link>
            )
        })
    }
    return (
        <div className="container">
            <Breadcrumb>
                <BreadcrumbItem>
                    <Link to="/home">Home</Link>
                </BreadcrumbItem>
                <BreadcrumbItem active>Poll</BreadcrumbItem>
            </Breadcrumb>
            <div className="row p-5 m-2 border border-primary rounded">
                <div className="col-12">
                    <h3>Poll</h3>
                    <hr />
                </div>    
                <InputGroup>
                    <InputGroupAddon addonType="append">
                        <InputGroupText><span className="fa fa-search fa-lg"></span></InputGroupText>
                    </InputGroupAddon>
                    <Input type="text" id="search" onChange={handleFieldChange} />
                </InputGroup>        
                <RenderPolls polls={props.polls} search={fields.search}/>
            </div>
        </div>
    )
}

export default ListPoll;