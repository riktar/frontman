import { atom } from "recoil";

const pageNameState = atom({
  key: "pageName",
  default: "",
});

const activeUserState = atom({
  key: "activeUser",
  default: {},
});

export { pageNameState, activeUserState };
