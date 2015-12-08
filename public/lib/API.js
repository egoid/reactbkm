import {get, post} from "jquery";

import ServerActions from "./actions/ServerActions";

let API = {
  saveBookmark(newBookmark) {
    console.log("2. In the API.saveBkm()")
    post("/api/links", newBookmark).done(data => ServerActions.receiveOneLink(data));
  },
  fetchAllBookmarks() {
    console.log("2. In the API.fetchAllBookmarks()")
    get("/api/links").done(data => ServerActions.receiveLinks(data.links));
  },
  letsDel(url) {
    console.log("2. In the API.letsdel()")
    // post("/api/del/links", url).done();
    post("/api/del/links", url).done(data => ServerActions.receiveDelLink(data));
  },
  likeBookmark(link) {
    console.log("2. In the API.liking this shit")
    // post("/api/del/links", url).done();
    post("/api/like/links", link).done(data => ServerActions.receiveLinks(data));
  }

};

export default API;
