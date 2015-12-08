import {EventEmitter} from "events";
import AppDispatcher from "../AppDispatcher";
import {ActionTypes} from "../Constants";

let _links = [];

class LinkStore extends EventEmitter {
  // Register with the Dispatcher
  constructor(props) {
    super(props);

    AppDispatcher.register(action => {
      switch (action.actionType) {
        case ActionTypes.RECEIVE_LINKS:
          console.log("4. We received news about the new data", action);
          // account for the new data;
          _links = action.links;
          this.emit("CHANGE");
          break;
        case ActionTypes.RECEIVE_ONE_LINK:
          console.log('Step 4. We received one new link', action);
          _links.push(action.link);
          this.emit("CHANGE");
          break;
        case ActionTypes.RECEIVE_DEL_LINK:
          console.log('Step 4. We received one del link', action);
          _links = JSON.stringify(_links);
          var cut = _links.indexOf(action.link.link);
          var left = _links.slice(0,cut);
          var right = _links.slice(cut);
          left = left.replace(/({"title":"[a-zA-Z]+","url":"$)/, '');
          right = right.replace(/(^.*.com","id":\d*})/, '');
          var bound = left.concat(right);
          bound = bound.replace(/(,,)/g,',');
          bound = bound.replace(/(\[\,)/,'[');
          bound = bound.replace(/(\,\])/,']');
          _links = JSON.parse(bound);
          this.emit("CHANGE");
          break;
        default:
          // do nothing
      }
    })
  }
  // Expose some data
  getAll() {
    if (!_links){
      console.log(_links)
      return _links = [];
    }
    _links =  _links.map(link => {
      link.url = link.url.startsWith("http") ? link.url : 
        'http://${link.url}'
        return link
    });
    return _links.map(link => {
      link.isSafe = link.url.startsWith("https") ? true : false
        return link
    })
  }

  // Listen stuff
  startListening(callback) {
    this.on("CHANGE", callback);
  }
  stopListening(callback) {
    this.removeListener("CHANGE", callback);
  }
}

export default new LinkStore();
