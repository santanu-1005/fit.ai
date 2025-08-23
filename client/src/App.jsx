import { Box, Button } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "react-oauth2-code-pkce";
import { useDispatch } from "react-redux";
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router";
import { setCredentials } from "./store/authSlice";
import ActivityList from "./components/ActivityList";
import ActivityForm from "./components/ActivityForm";
import ActivityDetail from "./components/ActivityDetail";

const ActivityPage = () => {
  return (
    <Box component="section" sx={{ p: 2, border: "1px solid grey" }}>
      <ActivityForm onActivitiesAdded={() => window.location.reload()} />
      <ActivityList />
    </Box>
  );
}

const App = () => {
  const { token, tokenData, logIn, logOut, isAuhenticated } =
    useContext(AuthContext);
  const dispatch = useDispatch();
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    if (token) {
      dispatch(setCredentials({ token, user: tokenData }));
      setAuthReady(true);
    }
  }, [token, tokenData, dispatch]);

  return (
    <Router>
      {!token ? (
        <Button color="#dc004e" variant="contained" onClick={() => logIn()}>
          Login
        </Button>
      ) : (
        <Box component="section" sx={{ p: 2, border: "1px solid grey" }}>
          <Routes>
            <Route path="/activities" element={<ActivityPage />} />
            <Route path="/activities/:id" element={<ActivityDetail />} />
            <Route path="/" element={token ? <Navigate to={"/activities"} replace/> : <div>Welcome! Please log in.</div>}/>
          </Routes>
        </Box>
        
      )}
      <Button color="#dc004e" variant="contained" onClick={() => logOut()}>
          Logout
        </Button>
    </Router>
  );
};

export default App;
