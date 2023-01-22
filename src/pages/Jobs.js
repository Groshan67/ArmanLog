import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardHeader,
} from "@material-ui/core/";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";
import LoadingSpinner from "./LoadingSpinner";
import axios from "axios";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const baseURL =
  "https://jobs.mehrkamjobs.com/api/portal/jobs/1788?category=&env=public";
const categoryURL = "https://jobs.mehrkamjobs.com/api/portal/1788/categories";

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

  const useStyles = makeStyles((theme) => ({
    title: {
      color: "#07844a",
    },
    cardStyle: {
      display: "block",
      width: "40vw",
      transitionDuration: "0.3s",
      height: "10vw",
    },
  }));
  console.log(cat);
  const classes = useStyles({});

  const catHandler = ({catID}) => {
        setJob(catID)
  };

  return (
    <div>
      <Box>
        {cat.isLoading ? (
          <LoadingSpinner />
        ) : (
          <ButtonGroup
            variant="text"
            orientation="horzintal"
            color="secondary"
            sx={{
              display: "inline-flex",
              "flex-wrap": "wrap",
            }}
          >
            {cat.data.map((t) => (
              <Button
                size="small"
                sx={{
                  bgcolor: "AppWorkspace",
                  boxShadow: 1,
                  borderRadius: 2,
                  margin: 0.5,
                  padding: 0.99,
                  fontFamily: "monospace",
                }}
                key={cat.data.indexOf(t)}
                onClick={() => {
                  const catID = cat.data.indexOf(t).categoryID;
                  catHandler(catID);
                }}
              >
                {cat.data[cat.data.indexOf(t)].en}
              </Button>
            ))}
          </ButtonGroup>
        )}
      </Box>

      <Grid container spacing={4} direction="row" alignItems="flex-start">
        {cat.jaba.map((elem) => (
          <Grid item xs={6} sm={12} md={6} key={cat.jaba.indexOf(elem)}>
            <Card className={classes.cardStyle}>
              <CardHeader
                className={classes.title}
                title={`${elem.title}`}
                subheader={`City : ${elem.city.en} | Exprience : ${elem.exprience.Title_EN}`}
                action={
                  <Button
                    size="small"
                    variant="text"
                    sx={{
                      backgroundColor: "#07844a",
                      color: "#fff",
                      boxShadow: 1,
                      borderRadius: 2,
                      margin: 1,
                      padding: 1,
                      "&:hover": {
                        borderColor: "rgba(255,240,10,0.8)",
                        opacity: ".8",
                        "background-color": "#07844a !important",
                        color: "#fff",
                      },
                    }}
                  >
                    Apply
                  </Button>
                }
              />

              {/* <CardContent>
                <Typography variant="h5" gutterBottom></Typography>
              </CardContent> */}
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Jobs;
