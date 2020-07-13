import React from 'react'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem
} from 'reactstrap';
import { Link } from 'react-router-dom';
   
function RenderDish({dish}){
    return(
        <Card>
            <CardImg top src={dish.image} alt={dish.name} />
            <CardBody>
                <CardTitle>{dish.name}</CardTitle>
                <CardText>{dish.description}</CardText>
            </CardBody>
        </Card>
    )
}

function RenderComments({comments}){
    const commentList =
        comments.map((comment) => {
            var date = new Date(comment.date); 
            date = date.toLocaleString()
            if(comment != null)
            {
                return (
                    <li key={comment.id} >
                        <div>{comment.comment}</div>
                        <div>--{comment.author} {date}</div>
                    </li>    
                );
            }
            else{
                return(
                    <div>No Comments</div>
                )
            }
        });
    return (
        <div>        
            <h4>Comments</h4>
            <div>
                <ul className="list-unstyled">
                    {commentList}
                </ul>
            </div>
        </div>

    )
}

    const DishDetail = (props) => {
        const dish = props.dish;
        if (dish != null)
            return (
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                            <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>{props.dish.name}</h3>
                            <hr />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 col-md-5 m-1">
                            <RenderDish dish={props.dish} />
                        </div>
                        <div className="col-12 col-md-5 m-1">
                            <RenderComments comments={props.comments} />
                        </div>
                    </div>
                </div>
            );
        else
            return (
                <div>No such dish exists</div>
            );
    }


export default DishDetail;