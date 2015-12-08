import React from "react";
import DelLink from "./../actions/DelLink";
import Likey from "./../actions/Likey";

class Link extends React.Component {
  constructor(props) {
    super(props);
  }
  toDel(url, e) {
    let toDel = { urlToDel: url };
    DelLink.del(toDel);
  }
  likey() {
    console.log('in likey');
    Likey.likeLink(this.props.link);
  }
  render() {
    let {title, url, safe, isSafe, likes} = this.props.link;
    var likeCount;
    if(likes){
      likeCount = <span> hearts : {likes.length}</span>
    }
    return (
      <div className="link">
        <a href={url} 
          style={ { color: ( safe ? 'green' : 'black') } }>{title}</a>
        <a onClick={this.toDel.bind(this, url)} value={url}> delete </a>
        <button onClick={this.likey.bind(this)}> heart </button>
          {likeCount}
      </div>
    );
  }
}

export default Link;
