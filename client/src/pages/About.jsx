import styles from "./About.module.css";
import React from "react";
import profilePic from "../assets/images/profile/profile-pic.jpg";

const About = () => {
  return (
    <>
      <h1 className={styles.aboutHeader}>Welcome to HeVeL</h1>
      <div className={styles.aboutMainBlock}>
        <p>
          Hevel is a Hebrew word that means “Smoke” or “Vapor”. In the bible it
          is found most frequently in the book of Ecclesiastes.
        </p>
        <blockquote cite="https://bibleproject.com/guides/book-of-ecclesiastes/">
          <q>
            The teacher uses this word 38 times throughout the book of
            Ecclesiastes as a metaphor to describe how life is temporary and
            fleeting, like a wisp of smoke, but also how life is an enigma or
            paradox. Smoke appears solid, but when you try to grab it, it’s like
            nothing is there.
          </q>
          <p>
            ~&nbsp;
            <a
              href="https://bibleproject.com/guides/book-of-ecclesiastes/"
              target="_blank"
            >
              The Bible Project
            </a>
          </p>
        </blockquote>
        <hr />
        <p>
          &emsp;I made this blog as a way to not only practice and hone my
          skills in programming and coding, but as a place to curate the things
          that I find interesting or amusing. As you look through, you can find
          all of the topics that I find interesting in the categories section
          and view related posts. Or just search the most recent posts on the
          homepage to see what's the latest pique of interest.
        </p>
        <p>
          &emsp;This blog was built using a few different technologies. On the
          front-end I am using React.js to create fast and visually pleasing
          component renderings for the user's consumption. The styling is done
          with vanilla CSS. On the backend I am using Python and Flask as an API
          to handle HTTP requests from the client. This is the first project
          that I am using MongoDB as a database, whereas I would usually use
          MySQL.
        </p>
        <p>
          &emsp;HeVeL is a playground that I’ve built to help me in my quest to
          transition into a Full Stack Web Developer role. Currently I work as a
          Repair Technician. I've done HVAC for most of my working career, but
          in 2020 while I was stuck at home for most of my days, I picked up
          coding as a hobby. I fell in love with the methodical and creative
          nature of building web applications and haven't looked back!{" "}
        </p>
        <p>
          I hope you enjoy this playground I’ve built and possibly learn
          something new along the way!{" "}
        </p>
        <hr />
        <div className={styles.imageBlock}>
          <div>
            <p>
              <b>Cameron Lopez</b> creator of HeVeL
            </p>
          </div>
          <img className={styles.profilePic} src={profilePic} alt="" />
        </div>
      </div>
    </>
  );
};

export default About;
