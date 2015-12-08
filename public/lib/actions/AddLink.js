import API from "../API";

let AddLink = {
  AdderLink(bkm) {
    console.log("1. In AddLink.AdderLink()");
    console.log(bkm)
    API.saveBookmark(bkm);
  }
};

export default AddLink;
