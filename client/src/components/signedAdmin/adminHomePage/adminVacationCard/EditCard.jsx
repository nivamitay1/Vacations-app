import React, { useState, useEffect } from "react";
import DatePicker from "../../../datePicker/DatePicker";
import Styles from "./adminVacationCard.module.css";
import axios from "axios";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";
import Loader from "../../../loader/Loader";

export default function EditCard({ setRender, vacation, vacationID }) {
  const [open, setOpen] = React.useState(false);
  const [active, setActive] = useState(false);
  const [inputVal, setInputVal] = useState();
  const [selectedFile, setSelectedFile] = useState(vacation.picture);
  const [previewSource, setPreviewSource] = useState(vacation.picture);
  const [description, setDescription] = useState(vacation.description);
  const [price, setPrice] = useState(vacation.price);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setInputVal("");
    setSelectedFile(vacation.picture);
    setPreviewSource(vacation.picture);
  }, [open]);

  function reverseDate(date) {
    let splitDate = date.split("-");

    let reverseArray = splitDate.reverse();

    let joinArray = reverseArray.join("-");

    return joinArray;
  }

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      previewFile(file);
    }
    setSelectedFile(file);
    setInputVal(e.target.value);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const handleSubmitFile = async (e) => {
    e.preventDefault();
    if (!selectedFile || !description || !price)
      return alert("All fields are mandatory");
    setActive(true);
    if (typeof selectedFile === "object") {
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onloadend = () => {
        uploadImage(reader.result);
      };
    } else {
      uploadImage(selectedFile);
    }
  };

  const uploadImage = async (base64EncodedImage) => {
    try {
      const vacation = {
        description: description,
        dates: `From: ${reverseDate(startDate)} until: ${reverseDate(endDate)}`,
        price: price,
        picture: base64EncodedImage,
      };
      const res = await axios.patch(
        `https://vacations-app-project.herokuapp.com/api/v1/vacations/${vacationID}`,
        vacation
      );
      setOpen(false);
      setRender(Math.random() * 1000);
      setInputVal("");
      setPreviewSource("");
      setActive(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Button type="button" size="small" color="primary" onClick={handleOpen}>
        Edit
      </Button>
      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={Styles.modal}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <div className={Styles.modalBody}>
              <h2 id="transition-modal-title">Edit Vacation</h2>
              <form noValidate autoComplete="off">
                <TextField
                  id="fileInput"
                  type="file"
                  name="picture"
                  label="Picture"
                  onChange={handleFileInputChange}
                  value={inputVal}
                  fullWidth
                  className="form-input"
                />
                <Loader active={active} />
                <Divider />

                <TextField
                  label="Vacation Description"
                  fullWidth
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />

                <Divider />

                <TextField
                  label="Price"
                  fullWidth
                  value={price}
                  onChange={(e) => {
                    setPrice(e.target.value);
                  }}
                />

                <Divider />

                <DatePicker
                  setStartDate={setStartDate}
                  setEndDate={setEndDate}
                />

                <Divider />

                <br />
                <Button
                  type="submit"
                  className={"postIcon"}
                  onClick={handleSubmitFile}
                  variant="contained"
                  color="primary"
                >
                  POST
                </Button>
              </form>
              <br />

              {previewSource && (
                <img
                  src={previewSource}
                  alt="chosen"
                  style={{ height: "300px" }}
                />
              )}
            </div>
          </Fade>
        </Modal>
      </div>
    </>
  );
}
