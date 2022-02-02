/*eslint-disable*/
import React from "react";
import { Container } from "reactstrap";
// used for making the prop types of this component
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
            {/* <li>
              <a
                href="https://presentation.creative-tim.com?ref=nudr-footer"
                target="_blank"
              >
                About Us
              </a>
            </li>
            <li>
              <a
                href="https://blog.creative-tim.com?ref=nudr-footer"
                target="_blank"
              >
                Blog
              </a>
            </li> */}
          </ul>
        </nav>
        <div className="copyright">
          &copy; {1900 + new Date().getYear()}, Designed by{" "}
          <a
            // href="https://www.invisionapp.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Pratyush
          </a>
          . Coded by{" "}
          <a
            // href="https://www.creative-tim.com?ref=nudr-footer"
            target="_blank"
            rel="noopener noreferrer"
          >
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
