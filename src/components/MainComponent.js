import React, {Component} from 'react';
import Menu from './MenuComponent';
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import Contact from './ContactComponent';
import DishDetail from './DishdetailComponent';
import About from './AboutComponent';
import Home from './HomeComponent';
import Vote from './VoteComponent';
import CreatePoll from './CreatePollComponent'
import PollDisplay from './PollDisplayComponent'
import ListPoll from './ListPollComponent'
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  postComment,
  fetchDishes,
  fetchComments,
  fetchPromos,
  fetchLeaders,
  authUser,
  logoutUser,
  postFeedback,
  postVote,
  fetchPolls,
  fetchPoll,
} from "../redux/ActionCreators";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { actions } from "react-redux-form";

const mapStateToProps = state => {
  return {
    dishes : state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders,
    users: state.users,
    polls: state.polls,
    poll: state.poll,
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchDishes: () => {
    dispatch(fetchDishes());
  },
  resetFeedbackForm: () => {
    dispatch(actions.reset("feedback"));
  },
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()),
  fetchLeaders: () => dispatch(fetchLeaders()),
  postComment: (dishId, rating, author, comment) =>
    dispatch(postComment(dishId, rating, author, comment)),
  postFeedback: (
    fisrtname,
    lastname,
    telnum,
    email,
    agree,
    contactType,
    message
  ) =>
    dispatch(
      postFeedback(
        fisrtname,
        lastname,
        telnum,
        email,
        agree,
        contactType,
        message
      )
    ),
  authUser: (user, password) => dispatch(authUser(user, password)),
  logoutUser: () => dispatch(logoutUser()),
  postVote: (dishId, userId) => dispatch(postVote(dishId, userId)),
  fetchPolls: () => dispatch(fetchPolls()),
  fetchPoll: (pollId) => dispatch(fetchPoll(pollId)),
});

class Main extends Component {
  
  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
    this.props.fetchPolls();
  }

  render() {
    const HomePage = () => {
      return (
        <Home
          dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
          dishesLoading={this.props.dishes.isLoading}
          dishErrMess={this.props.dishes.errMess}
          promotion={
            this.props.promotions.promotions.filter(
              (promo) => promo.featured
            )[0]
          }
          promoLoading={this.props.promotions.isLoading}
          promoErrMess={this.props.promotions.errMess}
          leader={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
          leadersLoading={this.props.leaders.isLoading}
          leadersErrMess={this.props.leaders.errMess}
        />
      );
    };

    const DishWithId = ({ match }) => {
      return (
        <DishDetail
          dish={
            this.props.dishes.dishes.filter(
              (dish) => dish.id === parseInt(match.params.dishId, 10)
            )[0]
          }
          isLoading={this.props.dishes.isLoading}
          errMess={this.props.dishes.errMess}
          comments={this.props.comments.comments.filter(
            (comment) => comment.dishId === parseInt(match.params.dishId, 10)
          )}
          commentsErrMess={this.props.comments.errMess}
          postComment={this.props.postComment}
        />
      );
    };

    const PollWithId = ({match}) => {
      return (
        <PollDisplay 
          pollId={match.params.pollId} 
          poll={this.props.poll} 
          fetchPoll={fetchPoll} />
      );
    }
    return (
      <div>
        <Header
          users={this.props.users}
          authUser={this.props.authUser}
          logoutUser={this.props.logoutUser}
        />
        <TransitionGroup>
          <CSSTransition
            key={this.props.location.key}
            classNames="page"
            timeout={300}
          >
            <Switch location={this.props.location}>
              <Route path="/home" component={HomePage} />
              <Route
                exact
                path="/aboutus"
                component={() => <About leaders={this.props.leaders} />}
              />
              } />
              <Route
                exact
                path="/menu"
                component={() => <Menu dishes={this.props.dishes} />}
              />
              <Route path="/menu/:dishId" component={DishWithId} />
              <Route
                exact
                path="/contactus"
                component={() => (
                  <Contact
                    resetFeedbackForm={this.props.resetFeedbackForm}
                    postFeedback={this.props.postFeedback}
                  />
                )}
              />
              <Route
                exact
                path="/vote"
                component={() => (
                  <Vote
                    dishes={this.props.dishes}
                    postVote={this.props.postVote}
                    user={this.props.users.user}
                  />
                )}
              />
              <Route exact path="/poll/:pollId" component={PollWithId} />
              <Route path="/createpoll" component={CreatePoll} />
              <Route exact path="/poll" component={() => <ListPoll polls={this.props.polls}/>} />
              <Redirect to="/home" />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));