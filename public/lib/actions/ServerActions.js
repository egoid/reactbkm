import AppDispatcher from "../AppDispatcher";
import {ActionTypes} from "../Constants";

let ServerActions = {
  receiveLinks(links) {
    console.log("3. In ServerActions.receiveLinks()", links);
    // Tell everyone about it.
    AppDispatcher.dispatch({
      actionType: ActionTypes.RECEIVE_LINKS,
      links
    });
  },
  receiveOneLink(link) {
    console.log("3. In ServerActions.receiveOneLink()", link);
    AppDispatcher.dispatch({
      actionType: ActionTypes.RECEIVE_ONE_LINK,
      link
    });
  },
  receiveDelLink(link) {
    console.log("3. In ServerActions.receiveDelLink()", link);
    AppDispatcher.dispatch({
      actionType: ActionTypes.RECEIVE_DEL_LINK,
      link
    });
  }

};

export default ServerActions;
