import React from "react";
import PropTypes from "prop-types";
import { useRecoilValue } from "recoil";
import { pageNameState } from "store/atoms";

const PageName = (props) => {
  const pageName = useRecoilValue(pageNameState);
  return (
    <p>
      <small>Page Name (Recoil Atom): {pageName}</small>
    </p>
  );
};

PageName.propTypes = {
  children: PropTypes.any,
};

export default PageName;
