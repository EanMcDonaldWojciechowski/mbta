import {
  AppBar,
  Box,
  Card,
  CardContent,
  Grid,
  GridList,
  GridListTile,
  Tabs,
  Icon,
  Typography,
  Tab,
  Paper
} from '@material-ui/core'
import SyncAltIcon from '@material-ui/icons/SyncAlt';
import React, { useState, useEffect } from "react";

const fetch = require('node-fetch');

const Home = () => {
  const [subwayLines, setSubwayLines] = useState([]);

  const fetchLineData = () => {
    fetch('https://api-v3.mbta.com/routes?filter[type]=1', {
      method: 'GET',
      headers: {
        'X-API-KEY': '612facdddc98479ab622c2272a2462c2'
      }
    })
    .then(res => res.json())
    .then(res => {
      const { data } = res;
      console.log(data);
      if (data) {
        setSubwayLines(data);
      }

    })
    .catch(err => console.log(err))
  }

  useEffect(() => {
    fetchLineData();
  }, []);

  const formatDestinations = (destinations) => {
    const style = {
      display: 'inline-flex'
    }

    return (
      <React.Fragment style={style}>
        <Typography>
          {destinations[0]}
        </Typography>
        <SyncAltIcon ></SyncAltIcon>
        <Typography>
          {destinations[1]}
        </Typography>
      </React.Fragment>
    );
  }

  const FullPageLineInfo = ({line}) => {
    const style = {
      backgroundColor: '#' + line.attributes.color,
      minHeight: '50vh',
      padding: '2em',
      color: 'white'
    }

    return (
      <Box style={style}>
        <Typography variant='h3'>
          {line.attributes.long_name}
        </Typography>
        <Typography >
          {formatDestinations(line.attributes.direction_destinations)}
        </Typography>
      </Box>
    );
  }

  return (
    <Grid>
      {subwayLines.map((line) => (
        <FullPageLineInfo line={line} />
      ))}
    </Grid>
  );
}

export default Home;
