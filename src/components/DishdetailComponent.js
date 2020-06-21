import React from 'react'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle
} from 'reactstrap';

   
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
                    <li>
                        <div>{comment.comment}</div>
                        <div>--{comment.author} {date}</div>
                    </li>    
                );
            }
            else{
                return(
                    <div></div>
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
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish}/>
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <RenderComments comments={props.dish.comments} />
                    </div>
                </div>
            );
        else
            return (
                <div></div>
            );
    }


export default DishDetail;