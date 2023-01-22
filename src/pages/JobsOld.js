import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardHeader,
} from "@material-ui/core/";
import LoadingSpinner from "./LoadingSpinner";
import axios from "axios";
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList } from 'react-window';



const baseURL =
  "https://jobs.mehrkamjobs.com/api/portal/jobs/1788?category=&env=public";
const categoryURL = "https://jobs.mehrkamjobs.com/api/portal/1788/categories";


function renderRow(props) {
  const { index, style } = props;

  return (
    <ListItem style={style} key={index} component="div" disablePadding>
      <ListItemButton>
        <ListItemText primary={`Item ${index + 1}`} />
      </ListItemButton>
    </ListItem>
  );
}


const Jobs = () => {
  const [job, setJob] = useState(0);

  const [cat, setCat] = useState({
    isLoading: false,
    data: [],
    jaba: [],
  });
  useEffect(() => {
    const data = async () => {
      try {
        console.log("ON");
        setCat((old) => ({ ...old, isLoading: true }));
        const res = await axios.get(categoryURL);
        const fetch = await axios.get(
          `${baseURL}?department=1217&category=&env=publics`
        );
        const category = res.data.data;
        const jobs = fetch.data.data;
        if (category) {
          setCat((old) => ({ ...old, isLoading: false, data: category }));
        }
        if (jobs) {
          setCat((old) => ({ ...old, isLoading: false, jaba: jobs }));
        }
      } catch (err) {
        throw new Error(err);
      }
    };
    data();
  }, []);


  return (
    <Box
      sx={{ width: '100%', height: 400, maxWidth: 360, bgcolor: 'background.paper' }}
    >
      <FixedSizeList
        height={400}
        width={360}
        itemSize={46}
        itemCount={200}
        overscanCount={5}
      >
        {renderRow}
      </FixedSizeList>
    </Box>
  );
}

export default Jobs;