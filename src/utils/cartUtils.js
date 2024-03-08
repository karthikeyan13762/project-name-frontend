export const addDecimal = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

export const updateCart = (state) => {
  state.itemsPrice = addDecimal(
    state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );
  state.shippingPrice = addDecimal(state.itemsPrice > 100 ? 0 : 10);
  state.taxPrice = addDecimal((state.itemsPrice * 0.15).toFixed(2));
  state.totalPrice = (
    +state.itemsPrice +
    +state.shippingPrice +
    +state.taxPrice
  ).toFixed(2);
  localStorage.setItem("cart", JSON.stringify(state));
  return state;
};
