import "./BookCard.scss";
import { AppConstants } from "../../../constants/App.constants";
import Button from "../../Button/Button";
import { useState, useEffect, useMemo, useCallback } from "react";
import prime from "../../../assets/prime.png";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";

const { BOOK_NOW } = AppConstants.COMMONS;

function BookCard({ ticketAmt }) {
  console.log("CONTAINER - BOOK NOW CARD");
  const [membershipDiscount, setMembershipDiscount] = useState(10);
  const [taxAmount, setTaxAmount] = useState(5);
  const [primeUser, setPrimeUser] = useState(false);
  const ticketAmtNum = useMemo(() => Number(ticketAmt.replace(/[^0-9.-]+/g, "")), [ticketAmt]);
  const navigate = useNavigate();

  // Used to set if user is prime or not

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userObj = JSON.parse(storedUser);
      console.log(userObj.prime);
      if (userObj.prime === true) {
        setPrimeUser(true);
      }
    }
  }, []);

  // Function to set membership discount

  const handleMembershipDiscount = useCallback((discount) => {
    console.log("RENDERING handleMembershipDiscount");
    setMembershipDiscount(10 + discount);
  }, []);

  // const handleMembershipDiscount = (discount) => {
  //   setMembershipDiscount(10 + discount);
  // }

  // Function to calculate Tax Amount based on percentage provided

  const handleTaxAmount = useCallback((percentage) => {
    const newTaxAmount = 5 + (ticketAmtNum * percentage) / 100;
    setTaxAmount(newTaxAmount);
  }, [ticketAmtNum]);

  // const handleTaxAmount = (percentage) => {
  //   const newTaxAmount = 5 + (ticketAmtNum * percentage) / 100;
  //   setTaxAmount(newTaxAmount);
  // }

  const totalPrice = useMemo(() => ticketAmtNum - membershipDiscount + taxAmount, [ticketAmtNum, membershipDiscount, taxAmount]);

  // Function to navigate to checkout page

  const onProceedClick = () => {
    navigate("/checkout-page");
  };
  const primeLogoClassName = classNames(
    { "prime-logo": primeUser === true },
    { none: primeUser === false }
  );

  return (
    <div className="book-card-container">
      <div className="book-card-content">
        <div className="book-card-header">
          <p className="book-card-heading">{BOOK_NOW.HEADING}</p>
          <img
            className={primeLogoClassName}
            src={prime}
            alt="prime-user-logo"
          />
        </div>
        <p className="city-card-subheading">{`$ ${totalPrice}`}</p>
        <div className="amount-section">
          <div>
            <p>{BOOK_NOW.MEMBERSHIP_DISCOUNT}</p>
            <p className="font-bold">{membershipDiscount}</p>
          </div>
          <div>
            <p>{BOOK_NOW.TAX_AMT}</p>
            <p className="font-bold">{taxAmount}</p>
          </div>
        </div>
        <p>{BOOK_NOW.PARA_ONE}</p>
        <div className="btn-group">
          {[1, 2, 3].map((year) => (
            <Button
              key={year}
              size="small"
              value={`${year} YEAR`}
              onClick={() => handleMembershipDiscount(year * 5)}
            ></Button>
          ))}
        </div>

        <p>{BOOK_NOW.PARA_TWO}</p>
        <div className="btn-group-2">
          {[10, 20, 30].map((tax) => (
            <Button
              key={tax}
              size="small"
              value={`${tax}%`}
              onClick={() => handleTaxAmount(tax)}
            ></Button>
          ))}
        </div>

        <p className="para-three">{BOOK_NOW.PARA_THREE}</p>
        <Button
          className="pay-btn"
          size="large"
          value="PROCEED TO PAY"
          onClick={onProceedClick}
        ></Button>
      </div>
    </div>
  );
}

export default BookCard;
