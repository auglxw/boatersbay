import React, { useState, useEffect } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { db } from "../../firebase";
import { onValue, ref, set } from "firebase/database";
import Button from "@mui/material/Button";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import { Grid } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";

function EditFAQ() {
  const [faq, updateFaq] = useState([]);
  const [newMode, updateNewMode] = useState(false);
  const [newQuestion, updateNewQuestion] = useState("");
  const [newAnswer, updateNewAnswer] = useState("");

  useEffect(() => {
    const query = ref(db, "FAQ");
    return onValue(query, (snapshot) => {
      const data = snapshot.val();
      updateFaq(data);
    });
  }, []);

  function handleEdit(e, idx, type) {
    var newfaq = faq;
    newfaq[idx][type] = e.target.value;
    updateFaq([...newfaq]);
  }

  function handleDelete(idx) {
    var newfaq = faq;
    newfaq.splice(idx, 1);
    updateFaq([...newfaq]);
  }

  function handleCancel() {
      updateNewMode(false);
      updateNewQuestion("");
      updateNewAnswer("");
  }

  function handleAddNewFaq() {
      updateNewMode(false);
      var newfaq = faq;
      newfaq.push({Question: newQuestion, Answer: newAnswer});
      updateFaq([...newfaq]);
      updateNewQuestion("");
      updateNewAnswer("");
  }

  function handleSave() {
      set(ref(db, "FAQ"), faq);
  }

  return (
    <div>
      <div className="editfaq-newfaq-div">
        <Button id="editfaq-newfaq-button" onClick={() => updateNewMode(true)}>
          Add new FAQ <AddCircleIcon />
        </Button>
      </div>
      <div className="editfaq-new-form" style={{visibility: newMode ? "visible" : "hidden"}}>
        <p>
          <b>Question</b>
        </p>
        <textarea value={newQuestion} onChange={(e) => updateNewQuestion(e.target.value)} />
        <p>
          <b>Answer</b>
        </p>
        <textarea value={newAnswer} onChange={(e) => updateNewAnswer(e.target.value)} />
        <div className="editfaq-new-button-div">
        <Button variant="contained" id="edit-save-button" onClick={handleCancel}>
          Cancel
        </Button>
        <Button variant="contained" id="edit-save-button" onClick={handleAddNewFaq}>
          Add
        </Button>
        </div>
      </div>
      {faq &&
        faq.map((data, idx) => {
          return (
            <Accordion id="editfaq-accordion" key={idx}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                {data["Question"]}
              </AccordionSummary>
              <AccordionDetails>
                <Grid container>
                  <Grid item xs={11}>
                    <p className="editfaq-input-label">
                      <b>Question</b>:
                    </p>
                    <input
                      className="editfaq-input"
                      value={data["Question"]}
                      onChange={(e) => handleEdit(e, idx, "Question")}
                    />
                    <p className="editfaq-input-label">
                      <b>Answer</b>:
                    </p>
                    <input
                      className="editfaq-input"
                      value={data["Answer"]}
                      onChange={(e) => handleEdit(e, idx, "Answer")}
                    />
                  </Grid>
                  <Grid item xs={1}>
                    <div className="editfaq-delete-div">
                      <DeleteIcon
                        className="editfaq-delete-icon"
                        onClick={() => handleDelete(idx)}
                      />
                    </div>
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
          );
        })}
      <Button variant="contained" id="edit-save-button" onClick={handleSave}>
        Save
      </Button>
    </div>
  );
}

export default EditFAQ;
