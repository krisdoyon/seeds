export const faqArr = [
  {
    question: "Who made this website?",
    answer: (
      <p>
        This website was made by Kris Doyon. I am an aspiring software developer
        from Connecticut. You can learn more about me and see all of my projects
        at <a href="https://krisdoyon.com">www.krisdoyon.com</a>
      </p>
    ),
  },
  {
    question: "What tools were used to create this site?",
    answer:
      "This website was built using Javascript and React. Several packages were used including React Router and React Portal, as well as Redux Toolkit for state management. Syling was done using SCSS modules.",
  },
  {
    question: "Where did you get the images for this site?",
    answer: (
      <p>
        All images were used with permission from the MI Gardener website. Check
        out their site at{" "}
        <a href="https://migardener.com">www.migardener.com</a>!
      </p>
    ),
  },
  {
    question: "Can I place a real order?",
    answer: (
      <>
        <p>Sadly, no :(</p>
        <p>This website is for demonstration purposes only.</p>
      </>
    ),
  },
];
