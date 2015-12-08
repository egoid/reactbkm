import API from "../API";

let DelLink = {
  del(url) {
    console.log("1. In DelLink.del()");
    API.letsDel(url);
  }
  // AdderLink(bkm) {
  //   console.log(bkm)
  //   API.saveBookmark(bkm);
  // }
};

export default DelLink;
