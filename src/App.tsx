import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./Sass/main.scss";
import { Header, Home, PostsList, UsersList } from "./components";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />

        <main className="middle-site container clearfix">
          <Routes>
            <Route path="" element={<Home />} />
            <Route path="users" element={<UsersList />} />
            <Route path="posts" element={<PostsList />} />
            <Route
              path="*"
              element={
                <main style={{ padding: "1rem" }}>
                  <p>There's nothing here!</p>
                </main>
              }
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
