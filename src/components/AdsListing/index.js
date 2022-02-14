import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import "./style.scss";
import { useState } from "react";
import { Database } from "../../services/firebase";
const useStyles = makeStyles({
  media: {
    height: 140,
  },
});
const Ads = (props) => {
  const classes = useStyles();
  return (
    <a href={props.link} target="_blank">
      <Card className={"mb-2 p-0"}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={props.image}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="body1"
              component="h2"
              className="text-capitalize"
            >
              {props.title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {props.description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </a>
  );
};
const AdsListing = () => {
  const [data, setData] = useState({ values: [] });
  const getData = async () => {
    try {
      await Database.collection("announcement")
        .get()
        .then((snap) => {
          const data = [];
          snap.forEach((doc) => data.push({ ...doc.data(), id: doc.id }));
          const temp = data[Math.floor(Math.random() * data.length)];
          if (temp) setData(temp);
        });
    } catch (error) {
      console.log("AdsCenter -> getData -> error", error);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      {data.values.map((d) => (
        <Ads {...d} />
      ))}
    </div>
  );
};

export default AdsListing;
