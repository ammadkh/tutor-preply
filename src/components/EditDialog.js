import React, { useContext, useEffect, useState } from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import { TutorContext } from "../contexts/tutorContext";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { languageProficiencyValues } from "../utils/utils";

export default function EdiDialog(props) {
  const { onClose, selectedValue, open, editData, fieldType } = props;
  const { updateTutorData } = useContext(TutorContext);
  const [field, setField] = useState(null);
  const [languagesSet, setLanguageSet] = useState([]);
  const [fieldValue, setFieldValue] = useState("");

  useEffect(() => {
    if (editData) {
      setField(editData.field);

      if (fieldType === "dropdown") {
        const languages = editData.languages.split(/(?<!\-)(?=[A-Z]|\))/);
        const languageSet = {};
        for (let i = 0; i < languages.length; i++) {
          if (i === 0) {
          } else {
            if (languages[i].includes("Chinese (")) {
              languageSet[languages[i] + languages[i + 1] + languages[i + 2]] =
                languages[i + 3];
              i = i + 3;
            } else {
              languageSet[languages[i]] = languages[i + 1];
              i = i + 1;
            }
          }
        }
        setLanguageSet(languageSet);
      }
    }
  }, [editData, fieldType]);

  useEffect(() => {
    if (editData) {
      setFieldValue(editData[field]);
    }
  }, [editData, field]);

  const handleClose = () => {
    onClose(selectedValue);
  };

  const onFieldChangeHandler = (event) => {
    setFieldValue(event?.target.value);
  };

  const saveInformationHandler = () => {
    const updatedBody = {
      [field]: fieldValue,
    };
    updateInformation(updatedBody);
    handleClose();
  };

  const updateInformation = async (body) => {
    try {
      updateTutorData(editData.tutor_id, body);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    //"Speaks:\nEnglishNative Chinese (Mandarin)Upper-Intermediate"
    if (fieldType === "dropdown") {
      let langString = `Speaks:\n`;
      for (let key in languagesSet) {
        langString = langString + key + languagesSet[key] + " ";
      }

      setFieldValue(langString.trim());
    }
  }, [languagesSet, fieldType]);

  return (
    <Dialog onClose={handleClose} open={open} style={{}} fullWidth={true}>
      <DialogTitle>Edit {field?.replace(/_/g, " ")}</DialogTitle>
      <DialogContent
        sx={{
          padding: "20px",
          margin: "20px",
          textAlign: "end",
        }}
      >
        {editData && fieldType !== "dropdown" && (
          <TextField
            type={fieldType}
            id="outlined-basic"
            label={field?.replace(/_/g, " ").toUpperCase()}
            variant="outlined"
            multiline={field === "description" ? true : false}
            maxRows={8}
            value={fieldValue}
            style={{
              width: "100%",
              marginTop: "20px",
              marginBottom: "50px",
            }}
            onChange={onFieldChangeHandler}
          />
        )}

        {editData &&
          fieldType === "dropdown" &&
          Object.keys(languagesSet).length > 0 &&
          Object.keys(languagesSet).map((key, index) => {
            return (
              <div
                key={index}
                style={{
                  textAlign: "start",
                  marginBottom: "20px",
                }}
              >
                <InputLabel id={index.toString()}>{key}</InputLabel>
                <Select
                  labelId={index.toString()}
                  id="demo-simple-select"
                  value={languagesSet[key].trim()}
                  label={key}
                  style={{ minWidth: "150px" }}
                  onChange={(event) => {
                    const updatingLanguages = { ...languagesSet };
                    updatingLanguages[key] = event.target.value;
                    setLanguageSet(updatingLanguages);
                  }}
                >
                  {languageProficiencyValues.map((option) => {
                    return (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    );
                  })}
                </Select>
              </div>
            );
          })}

        <Button
          onClick={handleClose}
          variant="contained"
          sx={{
            minWidth: "120px",
            fontSize: "15px",
            padding: "12px 10px",
            lineHeight: "auto",
            borderRadius: "10px",
            textTransform: "none",
            backgroundColor: "#f7f5f2",
            fontWeight: "600",
            color: "black",
            alignItems: "flex-end",
            marginRight: "10px",
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          disabled={!fieldValue}
          sx={{
            minWidth: "120px",
            fontSize: "15px",
            padding: "12px 10px",
            lineHeight: "auto",
            borderRadius: "10px",
            textTransform: "none",
            backgroundColor: "#0096b2",
            fontWeight: "600",
            color: "white",
            alignItems: "flex-end",
          }}
          onClick={saveInformationHandler}
        >
          Save
        </Button>
      </DialogContent>
    </Dialog>
  );
}
