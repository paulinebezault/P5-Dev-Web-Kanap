const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const orderId = urlParams.get("orderId");
const orderIdDOM = document.getElementById("orderId");
orderIdDOM.innerHTML = orderId;

