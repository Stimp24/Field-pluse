import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
const MastHeadwithImg = ({
  sectionClass,
  titleClass,
  title,
  subTitleClass,
  subTitle,
  paragraphClass,
  paragraph
}) => {
  return (
    <section className={sectionClass ? sectionClass : "jumbotron"}>
      <div className="container">
        <h1 className={titleClass ? titleClass : "display-4"}>{title}</h1>
        <p className={subTitleClass ? subTitleClass : "lead"}>{subTitle}</p>
        <div className={paragraphClass ? paragraphClass : "my-4"}>
          <p>{paragraph}</p>
        </div>
      </div>
    </section>
  );
};

MastHeadwithImg.propTypes = {
  sectionClass: PropTypes.string,
  titleClass: PropTypes.string,
  title: PropTypes.string,
  subTitleClass: PropTypes.string,
  subTitle: PropTypes.string,
  paragraphClass: PropTypes.string,
  paragraph: PropTypes.string,
  buttonClass: PropTypes.string,
  button: PropTypes.string
};
export default MastHeadwithImg;
