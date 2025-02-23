import React from "react";
import styles from "./Contact.module.css";

const Contact = () => {
  return (
    <>
      <h1>Contact Me</h1>
      <h3>Send me an email to say what's up!</h3>
      <form className={styles.contactForm} action="#">
        <div>
          <label htmlFor="name">Name: </label>
          <input type="text" />
        </div>
        <div>
          <label htmlFor="email">Email: </label>
          <input type="email" />
        </div>
        <div>
          <label htmlFor="message">Message: </label>
          <textarea
            style={{ width: "100%", height: "10rem" }}
            name="message"
            id="message"
          ></textarea>
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default Contact;
