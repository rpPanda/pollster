import * as ActionTypes from './ActionTypes'
import { baseUrl } from "../shared/baseUrl";
import { Auth } from 'aws-amplify'

export const fetchDishes = () => (dispatch) => {
  dispatch(dishesLoading(true));

  return fetch(baseUrl + "dishes")
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((response) => response.json())
    .then((dishes) => dispatch(addDishes(dishes)))
    .catch((error) => dispatch(dishesFailed(error.message)));
};

export const dishesLoading = () => ({
  type: ActionTypes.DISHES_LOADING,
});

export const dishesFailed = (errmess) => ({
  type: ActionTypes.DISHES_FAILED,
  payload: errmess,
});

export const addDishes = (dishes) => ({
  type: ActionTypes.ADD_DISHES,
  payload: dishes,
});

export const fetchComments = () => (dispatch) => {
  return fetch(baseUrl + "comments")
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((response) => response.json())
    .then((comments) => dispatch(addComments(comments)))
    .catch((error) => dispatch(commentsFailed(error.message)));
};

export const commentsFailed = (errmess) => ({
  type: ActionTypes.COMMENTS_FAILED,
  payload: errmess,
});

export const addComments = (comments) => ({
  type: ActionTypes.ADD_COMMENTS,
  payload: comments,
});

export const addComment = (comment) => ({
  type: ActionTypes.ADD_COMMENT,
  payload: comment,
});

export const postComment = (dishId, rating, author, comment) => (dispatch) => {
  const newComment = {
    dishId: dishId,
    rating: rating,
    author: author,
    comment: comment,
  };
  newComment.date = new Date().toISOString();

  return fetch(baseUrl + "comments", {
    method: "POST",
    body: JSON.stringify(newComment),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "same-origin",
  })
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        throw error;
      }
    )
    .then((response) => response.json())
    .then((response) => dispatch(addComment(response)))
    .catch((error) => {
      console.log("post comments", error.message);
      alert("Your comment could not be posted\nError: " + error.message);
    });
};

export const fetchPromos = () => (dispatch) => {
  dispatch(promosLoading());

  return fetch(baseUrl + "promotions")
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((response) => response.json())
    .then((promos) => dispatch(addPromos(promos)))
    .catch((error) => dispatch(promosFailed(error.message)));
};

export const promosLoading = () => ({
  type: ActionTypes.PROMOS_LOADING,
});

export const promosFailed = (errmess) => ({
  type: ActionTypes.PROMOS_FAILED,
  payload: errmess,
});

export const addPromos = (promos) => ({
  type: ActionTypes.ADD_PROMOS,
  payload: promos,
});

export const fetchLeaders = () => (dispatch) => {
  dispatch(leadersLoading());

  return fetch(baseUrl + "leaders")
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((response) => response.json())
    .then((leaders) => dispatch(addLeaders(leaders)))
    .catch((error) => dispatch(leadersFailed(error.message)));
};

export const leadersLoading = () => ({
  type: ActionTypes.LEADERS_LOADING,
});

export const leadersFailed = (errmess) => ({
  type: ActionTypes.LEADERS_FAILED,
  payload: errmess,
});

export const addLeaders = (leaders) => ({
  type: ActionTypes.ADD_LEADERS,
  payload: leaders,
});

export const addFeedback = (feedback) => ({
  type: ActionTypes.ADD_FEEDBACK,
  payload: feedback,
});

export const postFeedback = (
         fisrtname,
         lastname,
         telnum,
         email,
         agree,
         contactType,
         message,
       ) => (dispatch) => {
         const newFeedback = {
           fisrtname,
           lastname,
           telnum,
           email,
           agree,
           contactType,
           message,
         };
         newFeedback.date = new Date().toISOString();

         return fetch(baseUrl + "feedback", {
           method: "POST",
           body: JSON.stringify(newFeedback),
           headers: {
             "Content-Type": "application/json",
           },
           credentials: "same-origin",
         })
           .then(
             (response) => {
               if (response.ok) {
                 return response;
               } else {
                 var error = new Error(
                   "Error " + response.status + ": " + response.statusText
                 );
                 error.response = response;
                 throw error;
               }
             },
             (error) => {
               throw error;
             }
           )
           .then((response) => response.json())
           .then((response) => dispatch(addFeedback(response)))
           .catch((error) => {
             console.log("post comments", error.message);
             alert("Your comment could not be posted\nError: " + error.message);
           });
       };

export const authUser = (username, password) => async (dispatch) => {
  dispatch(userLoading());
  try {
    const res = await Auth.signIn(username, password);
    console.log(res);
    dispatch(getUser(res.attributes));
  } catch (error) {
    dispatch(authFailed(error.message));
  }
};

export const logoutUser = () => async (dispatch) => {
  dispatch(userLoading());
  try {
    await Auth.signOut();
    dispatch(getUser({}));
  } catch (error) {
    dispatch(authFailed(error.message));
  }
};

export const userLoading = () => ({
  type: ActionTypes.USER_LOADING,
});

export const getUser = (user) => ({
  type: ActionTypes.AUTH_USER,
  payload: user
});

export const authFailed = (errmess) => ({
  type: ActionTypes.DISHES_FAILED,
  payload: errmess,
});

export const addVote = (vote) => ({
  type: ActionTypes.ADD_VOTE,
  payload: vote,
});

export const postVote = (dishId, userId) => (dispatch) => {
  
  return fetch(baseUrl + "users/" + userId, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "same-origin",
  })
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        throw error;
      }
    )
    .then((response) => response.json())
    .then((response) => {
      const update = {...response,"vote": true, "itemvoteid": dishId}
      return fetch(baseUrl + "users/" + userId, {
        method: "PUT",
        body: JSON.stringify(update),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "same-origin",
      })
    })
    .then((response) => response.json())
    .then((response) => dispatch(addVote(response)))
    .catch((error) => {
      console.log("post vote", error.message);
      alert("Your vote could not be posted\nError: " + error.message);
    });
};

export const fetchPolls = () => (dispatch) => {
  dispatch(pollsLoading());

  return fetch(baseUrl + "polls")
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((response) => response.json())
    .then((polls) => dispatch(addPolls(polls)))
    .catch((error) => dispatch(pollsFailed(error.message)));
};

export const pollsLoading = () => ({
  type: ActionTypes.POLLS_LOADING,
});

export const pollsFailed = (errmess) => ({
  type: ActionTypes.POLLS_FAILED,
  payload: errmess,
});

export const addPolls = (leaders) => ({
  type: ActionTypes.ADD_POLLS,
  payload: leaders,
});

export const fetchPoll = (pollId) => (dispatch) => {
  dispatch(pollLoading());
  return fetch(baseUrl + "polls?key="+pollId)
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((response) => response.json())
    .then((poll) => dispatch(addPoll(poll)))
    .catch((error) => dispatch(pollFailed(error.message)));
};

export const pollLoading = () => ({
  type: ActionTypes.POLL_LOADING,
});

export const pollFailed = (errmess) => ({
  type: ActionTypes.POLL_FAILED,
  payload: errmess,
});

export const addPoll = (leaders) => ({
  type: ActionTypes.ADD_POLL,
  payload: leaders,
});
