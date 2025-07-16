import BurgerMenu from './BurgerMenu'

export default function Header() {
  return (
    <div style={{display:'flex'}}>
      <BurgerMenu />
      <input />
      <a href="/" style={{color:'red'}}>Desktop </a>
      <a href="/test">test </a>
      <a href="/products" style={{color:'white'}}>products </a>
      <a href="/login">login </a>
      <a href="/cart">cart </a>
    </div>
  );
}