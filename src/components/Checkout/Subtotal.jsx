import React from 'react';
import './Subtotal.css';
// import CurrencyFormat from 'react-currency-format';
import { NumericFormat } from "react-number-format";
import { useStateValue } from '../../StateProvider';
import { getBasketTotal } from '../../reducer';
import { useNavigate } from 'react-router-dom';

function Subtotal() {
  const [{ basket }, dispatch] = useStateValue();
  const navigate = useNavigate();

  return (
    <div className="subtotal">

<NumericFormat
  value={getBasketTotal(basket)}
  displayType="text"
  thousandSeparator={true}
  prefix="$"
  decimalScale={2}
  renderText={(value) => (
    <>
      <p>
        Subtotal ({basket.length} items): <strong>{value}</strong>
      </p>
      <small className="subtotal__gift">
        <input type="checkbox" /> This order contains a gift
      </small>
    </>
  )}
/>

      <button onClick={e => navigate('/payment')}>Proceed to Checkout</button>
    </div>
  );
}

export default Subtotal;