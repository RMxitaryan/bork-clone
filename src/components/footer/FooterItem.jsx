import { createUseStyles } from "react-jss";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const useStyles = createUseStyles({
  footerColumn: { marginRight: "30px", width: "172px" },
  footerColumnTitle: {
    display: "block",
    color: "#fff",
    fontWeight: "400",
    fontSize: "19px",
    fontFamily: "Akzidenz,Helvetica,Arial,sans-serif",
    lineHeight: "35px",
    letterSpacing: ".5px",
    transition: "opacity .3s ease",
    willChange: "opacity",
    paddingBottom: "5px",
    textDecoration: "none",
    outline: "0",
    "&:hover": {
      cursor: "pointer",
      color: "#dfd3c3",
    },
  },
  footerColumnList: {
    padding: "0",
    listStyleType: "none",
    display: "block",
    marginBlockStart: "1em",
    marginBlockEnd: "1em",
    marginInlineStart: "0px",
    marginInlineEnd: "0px",
  },
  footerColumnItem: { display: "list-item", textAlign: "-webkit-match-parent" },
  footerColumnItemLink: {
    display: "inline-block",
    padding: "6px 0",
    color: "#9d9390",
    fontSize: "16px",
    fontWeight: 200,
    fontFamily: "Akzidenz,Helvetica,Arial,sans-serif",
    lineHeight: "1.4",
    letterSpacing: ".4px",
    verticalAlign: "middle",
    transition: "color .3s ease",
    textDecoration: "none",
    outline: "0",
    "&:hover": {
      cursor: "pointer",
      color: "#fff",
    },
  },
});

export const FooterItem = ({ title, items, links }) => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.footerColumn}>
        <a className={classes.footerColumnTitle} href={links[0]} target="blank">
          {title}
        </a>
        <ul className={classes.footerColumnList}>
          <li className={classes.footerColumnItem}>
            <a
              className={classes.footerColumnItemLink}
              href={links[1]}
              target="blank"
            >
              {items[0]}
            </a>
          </li>
          <li className={classes.footerColumnItem}>
            <a
              className={classes.footerColumnItemLink}
              href={links[2]}
              target="blank"
            >
              {items[1]}
            </a>
          </li>
          <li className={classes.footerColumnItem}>
            <a
              className={classes.footerColumnItemLink}
              href={links[3]}
              target="blank"
            >
              {items[2]}
            </a>
          </li>
          <li className={classes.footerColumnItem}>
            <a
              className={classes.footerColumnItemLink}
              href={links[4]}
              target="blank"
            >
              {items[3]}
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};
