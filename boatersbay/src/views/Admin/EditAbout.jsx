import React, { useState, useEffect } from "react";
import "./Admin.css";
import { db } from "../../firebase";
import { onValue, ref, set } from "firebase/database";
import Button from '@mui/material/Button';

function EditAbout() {
  const [about, updateAbout] = useState("");

  useEffect(() => {
    const query = ref(db, "About");
    return onValue(query, (snapshot) => {
      const data = snapshot.val();
      updateAbout(data);
    });
  }, []);

  function handleSave() {
    set(ref(db, "About"), about);
  }

  return (
    <div>
      <div className="editabout-subsection">
        <p>Description</p>
        <textarea
          className="editabout-input"
          value={about.Description}
          onChange={(e) =>
            updateAbout({ ...about, Description: e.target.value })
          }
        />
      </div>
      <div className="editabout-subsection">
        <p>Phone</p>
        <input
          className="editabout-input"
          type="tel"
          value={about.Phone}
          onChange={(e) => updateAbout({ ...about, Phone: e.target.value })}
        />
      </div>
      <div className="editabout-subsection">
        <p>Email</p>
        <input
          className="editabout-input"
          type="email"
          value={about.Email}
          onChange={(e) => updateAbout({ ...about, Email: e.target.value })}
        />
      </div>
      <Button variant="contained" id="edit-save-button" onClick={handleSave}>Save</Button>
    </div>
  );
}

export default EditAbout;
