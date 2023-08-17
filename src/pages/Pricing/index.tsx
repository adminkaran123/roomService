import React from "react";
import { Wrapper } from "./Pricing.styles";
import { plans } from "../../utils/constants/constants";
import { Button } from "@mui/material";
import usePricing from "./Pricing.hooks";

function PricingTable() {
  const { purchasePlan } = usePricing();
  return (
    <Wrapper>
      <div className="box">
        <div className="title">
          <i className="fa fa-paper-plane" aria-hidden="true" />
          <h2>Basic</h2>
        </div>
        <div className="price">
          <h4>
            <sup>$</sup>
          </h4>
        </div>
        <div className="option">
          <ul>
            <li>
              <i className="fa fa-check" aria-hidden="true" />
              10 Gb Space
            </li>
            <li>
              <i className="fa fa-check" aria-hidden="true" />3 Domain Names
            </li>
            <li>
              <i className="fa fa-check" aria-hidden="true" />
              20 Emails
            </li>
            <li>
              <i className="fa fa-times" aria-hidden="true" />
              Live Support
            </li>
          </ul>
        </div>
        <Button
          className="btn"
          onClick={() => {
            purchasePlan(plans.basic);
          }}
        >
          Buy Now
        </Button>
      </div>
      <div className="box">
        <div className="title">
          <i className="fa fa-plane" aria-hidden="true" />
          <h2>Standard</h2>
        </div>
        <div className="price">
          <h4>
            <sup>$</sup>50
          </h4>
        </div>
        <div className="option">
          <ul>
            <li>
              <i className="fa fa-check" aria-hidden="true" />
              50 Gb Space
            </li>
            <li>
              <i className="fa fa-check" aria-hidden="true" />5 Domain Names
            </li>
            <li>
              <i className="fa fa-check" aria-hidden="true" />
              Unlimited Emails
            </li>
            <li>
              <i className="fa fa-times" aria-hidden="true" />
              Live Support
            </li>
          </ul>
        </div>
        <a href="https://codepen.io/collection/XdWJOQ/" className="btn">
          Buy Now
        </a>
      </div>
      <div className="box">
        <div className="title">
          <i className="fa fa-rocket" aria-hidden="true" />
          <h2>Premium</h2>
        </div>
        <div className="price">
          <h4>
            <sup>$</sup>100
          </h4>
        </div>
        <div className="option">
          <ul>
            <li>
              <i className="fa fa-check" aria-hidden="true" />
              Unlimited Space
            </li>
            <li>
              <i className="fa fa-check" aria-hidden="true" />
              30 Domain Names
            </li>
            <li>
              <i className="fa fa-check" aria-hidden="true" />
              Unlimited Emails
            </li>
            <li>
              <i className="fa fa-check" aria-hidden="true" />
              Live Support
            </li>
          </ul>
        </div>
        <a href="https://codepen.io/collection/XdWJOQ/" className="btn">
          Buy Now
        </a>
      </div>
    </Wrapper>
  );
}

export default PricingTable;
