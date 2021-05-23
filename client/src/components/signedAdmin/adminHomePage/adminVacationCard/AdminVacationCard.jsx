import React, { useState } from "react";
import EditCard from "./EditCard";
import DeleteCard from "./DeleteCard";
import Styles from "./adminVacationCard.module.css";
import { Image } from "cloudinary-react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

export default function AdminVacationCard({ vacation, setRender }) {
  const [follows, setFollows] = useState(vacation.follows);

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
          <Typography variant="body2" color="textSecondary" component="p">
            {vacation.price}
          </Typography>
          <Typography variant="body2" component="p">
            {follows.length} Followers
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {vacation.dates}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <EditCard
          setRender={setRender}
          vacation={vacation}
          vacationID={vacation.id}
        />
        <DeleteCard setRender={setRender} vacationID={vacation.id} />
      </CardActions>
    </Card>
  );
}
