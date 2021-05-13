import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configureStore";
import { Grid, Button } from "../elements";
import Header from "./Header";
import { Login, Join, FeedList, PostDetail, PostWrite } from "../pages";
import { apiKey } from "../shared/firebase";
import { actionCreators as userActions } from "../redux/modules/user";
import Permit from "./Permit";

function App() {
  const dispatch = useDispatch();
  const _ssesion_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
  const is_session = sessionStorage.getItem(_ssesion_key) ? true : false;

  useEffect(() => {
    if (is_session) {
      dispatch(userActions.loginCheckFB());
    }
  }, []);

  return (
    <BrowserRouter>
      <Grid padding="16px">
        <Header />
        <ConnectedRouter history={history}>
          <Route path="/" exact component={FeedList} />
          <Route path="/login" exact component={Login} />
          <Route path="/join" exact component={Join} />
          {/* <Route path="/post" exact component={PostWrite} /> */}
          <Route path="/feed" exact component={FeedList} />
          <Route path="/postwrite" exact component={PostWrite} />
        </ConnectedRouter>
      </Grid>
      <Permit>
        <Button
          is_float={true}
          txt="+"
          _onClick={() => {
            console.log("click");
          }}
        ></Button>
      </Permit>
    </BrowserRouter>
  );
}

export default App;
