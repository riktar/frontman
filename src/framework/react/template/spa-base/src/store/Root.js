import { types } from "mobx-state-tree";
import Layout from "store/models/Layout";

// Root Model
export const RootModel = types.model({
  layout: Layout,
});

// Initial Snapshot
export const snapshot = {
  layout: {},
};
