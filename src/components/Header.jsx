import BurgerMenu from "./BurgerMenu";

export default function Header() {


  const searchHandler = (ev) => {
    ev.preventDefault();
    const searchQuery = encodeURIComponent(ev.target.search.value.trim());
    if (searchQuery) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    } else {
    }
  };

  const cart = JSON.parse(localStorage.getItem("cart") || "[]");

  return (
    <div style={{ display: "flex" }}>
      <BurgerMenu />
      <form onSubmit={(ev) => searchHandler(ev)}>
        <input name="search" />
        <button>Search</button>
      </form>
      <a href="/" style={{color: 'green'}}>Phone </a>
      <a href="/test" >test </a>
      <a href="/products" style={{color:'yellow'}}>products </a>
      <a href="/auth">login </a>
      <a href="/cart" style={{color:'white'}}>cart {cart && cart.length}</a>
    </div>
  );
}
