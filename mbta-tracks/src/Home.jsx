import {
  AppBar,
  Box,
  Button,
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
      display: 'inline-flex',
      verticalAlign: 'center',
      alignItems: 'center'
    }

    const iconStyle = {
      paddingLeft: '.5em',
      paddingRight: '.5em',
      fontSize: '.7em !important'
    }

    return (
      <Box style={style}>
        <Typography>
          {destinations[0]}
        </Typography>
        <SyncAltIcon style={iconStyle}></SyncAltIcon>
        <Typography>
          {destinations[1]}
        </Typography>
      </Box>
    );
  }

  const FullPageLineInfo = ({line}) => {
    const style = {
      backgroundColor: '#' + line.attributes.color,
      minHeight: '100vh',
      padding: '2.5em',
      color: 'white'
    }

    const buttonStyle = {
      color: 'white',
      borderColor: 'white'
    }

    return (
      <Box style={style}>
        <Typography variant='h4'>
          {line.attributes.long_name}
        </Typography>
        <Box>{formatDestinations(line.attributes.direction_destinations)}</Box>
        <Button variant='outlined' style={buttonStyle}>
          Learn more about the {line.id} line
        </Button>
      </Box>
    );
  }

  return (
    <Grid>
      {subwayLines.map((line) => (
        <FullPageLineInfo key={line.id} line={line} />
      ))}
    </Grid>
  );
}

export default Home;
