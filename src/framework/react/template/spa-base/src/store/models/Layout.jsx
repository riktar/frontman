import { types } from "mobx-state-tree";

const Layout = types
  .model({
    currentPage: types.maybe(types.string),
  })
  .actions((self) => {
    const setCurrentPage = (name) => {
      self.currentPage = name;
    };

    return { setCurrentPage };
  });

export default Layout;
