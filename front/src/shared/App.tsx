import * as React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configureStore";
import { Grid, Button } from "../elements";
import Header from "./Header";
import { Login, Join, FeedList, Post, NotiList  } from "../pages";
import { apiKey } from "../utils/firebaseUtils";
import { actionCreators as userActions } from "../redux/modules/user";
import Permit from "../components/common/Permit";

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
          <Route path="/feed" exact component={FeedList} />
          <Route path="/post" exact component={Post} />
          <Route path="/post/:id" exact component={Post} />
          <Route path="/noti" exact component={NotiList}/>
        </ConnectedRouter>
      </Grid>
      <Permit>
        <Button
          is_float={true}
          txt="+"
          _onClick={() => {
            history.push("/post");
          }}
        ></Button>
      </Permit>
    </BrowserRouter>
  );
}

export default App;
