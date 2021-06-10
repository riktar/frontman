import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "store";
import classes from "./styles.module.css";
import { Link } from "react-router-dom";

const Http404 = observer((props) => {
  const { layout } = useStore();
  useEffect(() => {
    layout.setCurrentPage("Not Found");
  }, []);

  return (
    <>
      <div className={classes.main}>
        <div className="w-full text-center">
          <h1 className={classes.title}>Ops Page not found!</h1>
          <p className="mt-10 text-gray-400 align-center">
            Are you lost? Go to the{" "}
            <Link to={"/"}>
              <span className="text-green-500">Home</span>
            </Link>
          </p>
        </div>
      </div>
    </>
  );
});

export default Http404;
