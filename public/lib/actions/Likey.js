import API from "../API";

let Likey = {
  likeLink(link) {
    console.log("1. In likeey, likelink()");
    console.log(link)
    API.likeBookmark(link);
  }
};

export default Likey;
