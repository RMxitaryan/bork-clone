import { createUseStyles } from "react-jss";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FooterItem } from "./FooterItem";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";

const useStyles = createUseStyles({
  footer: { display: "flex", flexDirection: "column", paddingTop: "80px" },
  footerLine: {
    border: "1px solid #bcaaa4",
  },
  contact: {
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    color: "#8d6e63",
    justifyContent: "center",
  },
  contactNumber: {
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    color: "#bcaaa4",
  },
  about: {
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 30,
  },
  aboutTitle: {
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
    color: "#bcaaa4",
  },
  aboutBork: {
    fontWeight: "500",
    fontSize: 40,
    fontFamily: "Akzidenz-Ext,Helvetica,Arial,sans-serif",
    letterSpacing: ".1px",
    color: "#625750",
    "&:hover": {
      position: "relative",
      cursor: "pointer",
      transition: "color .3s ease",
      color: "#fff",
    },
  },
  icon: {
    marginRight: 10,
    marginTop: 24,
    color: "#625750",
    "&:hover": {
      position: "relative",
      cursor: "pointer",
      transition: "color .3s ease",
      color: "#fff",
    },
  },
  aboutTextContainer: { width: "658px", margin: "62px auto" },
  aboutText: {
    margin: "25px 0",
    color: "#fff",
    fontWeight: "400",
    fontSize: "16px",
    lineHeight: "1.563",
    letterSpacing: ".4px",
    textAlign: "left",
    letterSpacing: ".11em",
  },
  hideButton: {
    letterSpacing: ".11em",
    padding: "8px 17px 8px 17px",
    fontSize: 14,
    fontWeight: "100px",
    border: "1px solid #fff",
    borderRadius: 90,
    color: "3a3330",
    textTransform: "uppercase",
    "&:hover": {
      position: "relative",
      cursor: "pointer",
      transition: "color .3s ease",
      color: "#ef6f2e",
    },
  },
  nav: { order: "2", display: "flex", justifyContent: "space-evenly" },
  footerColumn: { marginRight: "30px", width: "172px" },
  end: {
    order: "5",
    paddingTop: "34px",
    paddingBottom: "10px",
    color: "#9d9390",
    fontWeight: 200,
    fontSize: "16px",
    fontFamily: "Akzidenz,Helvetica,Arial,sans-serif",
    lineHeight: "1.25",
    letterSpacing: ".4px",
    textAlign: "center",
  },
  endA: {
    marginLeft: "12px",
    textDecoration: "none",
    color: "#9d9390",
    outline: "0",
    "&:hover": {
      cursor: "pointer",
      color: "#fff",
      transition: "color .3s ease",
    },
  },
  allFooter: { width: "100%" },
});

export const Footer = () => {
  const classes = useStyles();
  const [showMore, setShowMore] = useState(false);

  return (
    <div className={classes.allFooter}>
      <div className={classes.footer}>
        <div className={classes.contact}>
          <hr className={classes.footerLine}></hr>
          <h3 className={classes.contact}>Contact us</h3>
          <h4 className={classes.contactNumber}>+374 410 104 35</h4>
          <hr className={classes.footerLine}></hr>
        </div>
        <div className={classes.about}>
          {!showMore ? (
            <div
              className={classes.aboutTitle}
              onClick={() => {
                setShowMore(true);
              }}
            >
              <p className={classes.aboutBork}>About Bork</p>
              <KeyboardDoubleArrowDownIcon className={classes.icon} />
            </div>
          ) : (
            <div className={classes.aboutTextContainer}>
              <h1 className={classes.aboutBork}>About Bork</h1>
              <p className={classes.aboutText}>
                BORK — international company, manufacturing premium-level home
                appliances. In order to create a product of such high level,
                BORK employs the best designers and manufacturers from all
                around the world, including: Switzerland, Australia, Japan,
                Korea and others.
              </p>
              <p className={classes.aboutText}>
                BORK appliances are recognized by experts worldwide. To date,
                exclusive models have won 51 international awards in the field
                of industrial design, among which are RedDot Design Award, iF
                Design Award and others.
              </p>
              <p className={classes.aboutText}>
                While designing its unique devices, the company strives to
                achieve the perfection in each component. You can learn more
                about the masterpieces of home collection in catalog or in BORK
                boutiques in your city.
              </p>
              <button
                onClick={() => {
                  setShowMore(false);
                }}
                className={classes.hideButton}
              >
                Hide
              </button>
            </div>
          )}
        </div>
        <nav className={classes.nav}>
          <FooterItem
            title={"About Company"}
            items={["History", "Awards", "Contacts", "Boutiques"]}
            links={[
              "https://www.bork.am/about/",
              "https://www.bork.am/about/",
              "https://www.bork.am/about/awards/",
              "https://www.bork.am/support/contacts/",
              "https://www.bork.am/support/pickup/",
            ]}
          />
          <FooterItem
            title={"Service"}
            items={["Service centers", "Hotline", "Payment", "Delivery"]}
            links={[
              "https://www.bork.am/support/",
              "https://www.bork.am/support/",
              "https://www.bork.am/support/hotline/",
              "https://www.bork.am/support/payment/",
              "https://www.bork.am/support/delivery/",
            ]}
          />
          <FooterItem
            title={"Online boutiques"}
            items={["Kitchen", "Home and Climate", "Beauty", "Accessories"]}
            links={[
              "https://www.bork.am/support/pickup/",
              "http://localhost:3000/Kitchen",
              "http://localhost:3000/HomeAndClimat",
              "http://localhost:3000/HealthAndBeauty",
              "http://localhost:3000/Accessories",
            ]}
          />
        </nav>
      </div>
      <p className={classes.end}>
        <span>© 2023 BORK All rights reserved</span>
        <a
          target="blank"
          href="https://www.bork.am/support/privacy/"
          className={classes.endA}
        >
          Terms of Use and Privacy Policy
        </a>
      </p>
    </div>
  );
};
