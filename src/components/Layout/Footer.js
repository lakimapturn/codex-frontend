/*eslint-disable*/
import React from "react";
import { Container } from "reactstrap";

import PropTypes from "prop-types";

function Footer(props) {
  return (
    <footer className={"footer" + (props.default ? " footer-default" : "")}>
      <Container fluid={props.fluid ? true : false}>
        <nav>
          <ul>
            <li>
              <a href="https://github.com/lakimapturn" target="_blank">
                lakimapturn
              </a>
            </li>
          </ul>
        </nav>
        <div className="copyright">
          &copy; {1900 + new Date().getYear()}, Designed by{" "}
          <a target="_blank" rel="noopener noreferrer">
            Pratyush
          </a>
          . Coded by{" "}
          <a target="_blank" rel="noopener noreferrer">
            Laksh
          </a>
          .
        </div>
      </Container>
    </footer>
  );
}

Footer.propTypes = {
  default: PropTypes.bool,
  fluid: PropTypes.bool,
};

export default Footer;
