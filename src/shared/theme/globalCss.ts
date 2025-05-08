export const globalCss = {
  "html, body": {
    margin: 0,
    padding: 0,
    bg: "bg.primary",
    color: "text.primary",
    fontFamily: "body",
  },
  "*::placeholder": {
    color: "text.secondary",
    opacity: 1,
  },
  "*::selection": {
    bg: "accent",
    color: "white",
  },
  "a:focus": {
    outline: "none",
    boxShadow: "none",
  },
};
