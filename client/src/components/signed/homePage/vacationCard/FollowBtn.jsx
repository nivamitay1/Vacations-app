import React, { useEffect } from "react";
import axios from "axios";
import { Button } from "@material-ui/core";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function FollowBtn({
  vacation,
  vacationID,
  numberOfFollowers,
  setNumberOfFollowers,
  setFollowBtnTexts,
  followBtnTexts,
  setRender,
  isFiltering,
}) {
  const userID = JSON.parse(localStorage.getItem("vacationsUser")).id;
  const follow = async () => {
    toast.info("Updating the page");
    const res = await axios.post(
      "https://vacations-app-project.herokuapp.com/api/v1/follow",
      {
        userID,
        vacationID,
      }
    );
    if (!isFiltering) {
      return setRender(Math.random() * 1000);
    }
    if (vacation.isFollowed) {
      setNumberOfFollowers(numberOfFollowers - 1);
      vacation.isFollowed = false;
      setFollowBtnTexts("Follow");
    } else {
      setNumberOfFollowers(numberOfFollowers + 1);
      vacation.isFollowed = true;
      setFollowBtnTexts("Unfollow");
    }
  };
  useEffect(() => {
    const found = vacation.follows.find((item) => item.user_id === userID);
    if (found) {
      setFollowBtnTexts("Unfollow");
      vacation.isFollowed = true;
    } else {
      setFollowBtnTexts("Follow");
    }
  }, []);

  return (
    <>
      <Button fullWidth color="primary" variant="contained" onClick={follow}>
        {followBtnTexts}
      </Button>
    </>
  );
}
