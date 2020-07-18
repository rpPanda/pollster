import React, { Component } from 'react'
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Row,
  Label,
  Col
} from "reactstrap";
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from "react-redux-form";
import { Loading } from "./LoadingComponent";
import { baseUrl } from "../shared/baseUrl";

const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;
const required = (val) => val && val.length;

class CommentForm extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      isModalOpen: false,
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.handleComment = this.handleComment.bind(this);
  }
  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }

  handleComment(values) {
    this.toggleModal();
    this.props.postComment(
      this.props.dishId,
      values.rating,
      values.author,
      values.comment
    );
    console.log("Current State is: " + this.props.dishId +  JSON.stringify(values));
  }

  render() {
    return (
      <div>
        <Button outline color="secondary" onClick={this.toggleModal}>
          <i className="fa fa-edit" />
          Submit Comment
        </Button>
        <Modal 
          isOpen={this.state.isModalOpen} 
          toggle={this.toggleModal}
          animation={false} 
          >
          <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
          <ModalBody>
            <div className="col-12">
              <h3>Submit Comment</h3>
            </div>
            <div className="col-12">
              <LocalForm onSubmit={(values) => this.handleComment(values)}>
                <Row className="form-group">
                  <Label htmlFor="rating" md={2}>
                    First Name
                  </Label>
                  <Col md={10}>
                    <Control.select
                      model=".rating"
                      id="rating"
                      name="rating"
                      className="form-control"
                      defaultValue = "1"
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </Control.select>
                  </Col>
                </Row>
                <Row className="form-group">
                  <Label htmlFor="author" md={2}>
                    Name
                  </Label>
                  <Col md={10}>
                    <Control.text
                      model=".author"
                      id="author"
                      name="author"
                      placeholder="Name"
                      className="form-control"
                      validators={{
                        required,
                        minLength: minLength(3),
                        maxLength: maxLength(15),
                      }}
                    />
                    <Errors
                      className="text-danger"
                      model=".author"
                      show="touched"
                      messages={{
                        required: "Required",
                        minLength: "Must be greater than 2 characters",
                        maxLength: "Must be 15 characters or less",
                      }}
                    />
                  </Col>
                </Row>
                <Row className="form-group">
                  <Label htmlFor="comment" md={2}>
                    Your Feedback
                  </Label>
                  <Col md={10}>
                    <Control.textarea
                      model=".comment"
                      id="comment"
                      name="comment"
                      className="form-control"
                      rows="6"
                    ></Control.textarea>
                  </Col>
                </Row>
                <Row className="form-group">
                  <Col md={{ size: 10, offset: 2 }}>
                    <Button type="submit" color="primary">
                      Send Comment
                    </Button>
                  </Col>
                </Row>
              </LocalForm>
            </div>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

function RenderDish({dish}){
    return (
      <Card>
        <CardImg top src={baseUrl + dish.image} alt={dish.name} />
        <CardBody>
          <CardTitle>{dish.name}</CardTitle>
          <CardText>{dish.description}</CardText>
        </CardBody>
      </Card>
    );
}

function RenderComments({ comments, postComment, dishId }) {
  const commentList = comments.map((comment) => {
    var date = new Date(comment.date);
    date = date.toLocaleString();
    if (comment != null) {
      return (
        <li key={comment.id}>
          <div>{comment.comment}</div>
          <div>
            --{comment.author} {date}
          </div>
        </li>
      );
    } else {
      return <div>No Comments</div>;
    }
  });
  return (
    <div>
      <h4>Comments</h4>
      <div>
        <ul className="list-unstyled">{commentList}</ul>
        <CommentForm dishId={dishId} postComment={postComment} />
      </div>
    </div>
  );
}

const DishDetail = (props) => {
    if (props.isLoading) {
      return (
        <div className="container">
          <div className="row">
            <Loading />
          </div>
        </div>
      );
    } else if (props.errMess) {
      return (
        <div className="container">
          <div className="row">
            <h4>{props.errMess}</h4>
          </div>
        </div>
      );
    } else if (props.dish != null)
      return (
        <div className="container">
          <div className="row">
            <Breadcrumb>
              <BreadcrumbItem>
                <Link to="/home">Home</Link>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <Link to="/menu">Menu</Link>
              </BreadcrumbItem>
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
              <RenderComments
                comments={props.comments}
                dishId={props.dish.id}
                postComment={props.postComment}
              />
            </div>
          </div>
        </div>
      );
    else return <div>No such dish exists</div>;
}


export default DishDetail;