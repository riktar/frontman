import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "store";
import classes from "./styles.module.css";

const Home = observer((props) => {
  const { layout } = useStore();
  useEffect(() => {
    layout.setCurrentPage("Home");
  }, []);

  return (
    <>
      <div className={classes.main}>
        <div className="w-full text-center">
          <h1 className={classes.title}>Ready to Code!</h1>
          <h2 className={classes.subtitle}>
            Powered by <strong className="text-green-600">Frontman</strong>
          </h2>
        </div>
      </div>
    </>
  );
});

export default Home;
