import React, { useState } from "react";
import FollowBtn from "./FollowBtn";
import Styles from "./vacationCard.module.css";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

export default function VacationCard({ vacation, setRender, isFiltering }) {
  const [follows, setFollows] = useState(vacation.follows);
  const [numberOfFollowers, setNumberOfFollowers] = useState(
    follows.length || 0
  );
  const [followBtnTexts, setFollowBtnTexts] = useState("");

  return (
    <Card className={Styles.card}>
      <CardActionArea>
        <CardMedia
          className={Styles.cardImg}
          image={vacation.picture}
          title={vacation.description}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {vacation.description}
          </Typography>
          <Typography variant="body2" component="p">
            Price: {vacation.price}
          </Typography>
          <Typography variant="body2" component="p">
            {numberOfFollowers} Followers
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {vacation.dates}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <FollowBtn
          vacationID={vacation.id}
          followBtnTexts={followBtnTexts}
          setFollowBtnTexts={setFollowBtnTexts}
          vacation={vacation}
          numberOfFollowers={numberOfFollowers}
          setNumberOfFollowers={setNumberOfFollowers}
          setRender={setRender}
          isFiltering={isFiltering}
        />
      </CardActions>
    </Card>
  );
}
