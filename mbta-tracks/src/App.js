import React, { useState, useEffect } from "react";

const fetch = require('node-fetch');

const App = () => {

  useEffect(() => {
    fetch('https://api-v3.mbta.com/routes?filter[type]=1')
    .then(res => res.json())
    .then(res => {
      console.log(res);

    })
    .catch(err => console.log(err))

  }, []);


  return <h1>Hello</h1>;

}

export default App;
