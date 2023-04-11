import React from 'react';
import styles from './Home.module.css';

const Home = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.homeLogo}></div>
        <p className={styles.aboutParagraph}>
          If you&apos;re considering hanging an object on a wall or attempting to change an oil filter in your car
          without prior experience or uncertainty about the necessary tools, you can rest easy knowing that we&apos;re
          here to assist you.
          <br />
          Our collection of articles covers a range of do-it-yourself tasks both indoors and outdoors, making it easy
          for you to find the information you need to complete your project.
          <br />
          Feel free to browse our selection of articles by clicking the link at the top of the page.
          <br />
          The Handy Dandy website is a useful resource for anyone looking to take on do-it-yourself projects.
          <br />
          It provides a range of articles that cover a variety of tasks, from basic home repairs to more advanced
          outdoor projects.
          <br />
          The Website is designed for you to have a smooth experience, making it simple for users to find the
          information they need.
          <br />
          Whether you&apos;re a seasoned DIY enthusiast or just starting out, the Handy Dandy website is an excellent
          resource to have at your fingertips.
        </p>
      </div>
    </>
  );
};

export default Home;
