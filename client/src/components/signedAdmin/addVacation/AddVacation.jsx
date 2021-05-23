import React, { useState, useEffect } from "react";
import DatePicker from "../../datePicker/DatePicker";
import Loader from "../../loader/Loader";
import axios from "axios";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";
import Styles from "./addVacation.module.css";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";

export default function AddVacation({ setRender }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(false);
  const [inputVal, setInputVal] = useState("");
  const [selectedFile, setSelectedFile] = useState();
  const [previewSource, setPreviewSource] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
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
    setSelectedFile();
    setPreviewSource("");
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

    if (!selectedFile || !description || !price) {
      return alert("All fields are mandatory");
    }
    setActive(true);

    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onloadend = () => {
      uploadImage(reader.result);
    };
  };

  const uploadImage = async (base64EncodedImage) => {
    try {
      const vacation = {
        description: description,
        dates: `From: ${reverseDate(startDate)} until: ${reverseDate(endDate)}`,
        price: price,
        picture: base64EncodedImage,
      };

      const res = await axios.post(
        "https://vacations-app-project.herokuapp.com/api/v1/vacations",
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
      <div className={Styles.openModalBtn}>
        <Tooltip title="Add vacation">
          <IconButton color={"inherit"} onClick={handleOpen}>
            <AddCircleIcon />
          </IconButton>
        </Tooltip>
      </div>

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
              <h2 id="transition-modal-title">Add Vacation</h2>
              <form noValidate autoComplete="off">
                <TextField
                  id="fileInput"
                  type="file"
                  accept="image/*"
                  required
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
                  required
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />

                <Divider />

                <TextField
                  label="Price"
                  fullWidth
                  required
                  onChange={(e) => {
                    setPrice(e.target.value);
                  }}
                />

                <Divider />
                <br />

                <Divider />
                <DatePicker
                  setStartDate={setStartDate}
                  setEndDate={setEndDate}
                />
                <br />
                <Button
                  type="submit"
                  onClick={handleSubmitFile}
                  variant="contained"
                  color="primary"
                >
                  Create
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
