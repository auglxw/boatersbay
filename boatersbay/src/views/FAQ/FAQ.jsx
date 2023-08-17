import React, { useState, useEffect } from "react";
import Heading from "../../components/Heading/Heading";
import { db } from "../../firebase";
import { onValue, ref } from "firebase/database";

function FAQ() {
  const [faq, updateFaq] = useState([]);

  useEffect(() => {
    const query = ref(db, "FAQ");
    return onValue(query, (snapshot) => {
      const data = snapshot.val();
      updateFaq(data);
    });
  }, []);

  return (
    <div>
      <Heading choice="faq" />
      <p className="pageTitle">FREQUENTLY-ASKED QUESTIONS</p>
      {faq && faq.map((data, key) => (
        <div key={key}>
          <p>
            <b>Q: </b>
            {data.Question}
          </p>
          <p>
            <b>A: </b>
            {data.Answer}
          </p>
          <p>- - -</p>
        </div>
      ))}
    </div>
  );
}

export default FAQ;
