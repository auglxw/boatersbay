import { useState, useEffect } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Water } from "react-bootstrap-icons";

function Heading(props) {
  const [navLinkSelected, updateSelected] = useState(0);

  useEffect(() => {
    if (props.choice === "about") {
      updateSelected(1);
    } else if (props.choice === "faq") {
      updateSelected(2);
    } else if (props.choice === "products") {
      updateSelected(3);
    } else if (props.choice === "cart") {
      updateSelected(4);
    } else {
      updateSelected(0);
    }
  }, [props.choice]);

  return <div className="heading">
    <div className="header">
      <a href="/" className="name">BOATERS BAY  </a>
      <Water size={25} />
    </div>
    <Navbar collapseOnSelect expand="lg" variant="light" id="navBar">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" className="hamburger" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="flexContent me-auto">
            <Nav.Link href="/about" id={navLinkSelected === 1 ? "nlselected" : "navLink"}>About</Nav.Link>
            <Nav.Link href="/faq" id={navLinkSelected === 2 ? "nlselected" : "navLink"}>FAQ</Nav.Link>
            <Nav.Link href="/products" id={navLinkSelected === 3 ? "nlselected" : "navLink"}>Products</Nav.Link>
            <Nav.Link href="/cart" id={navLinkSelected === 4 ? "nlselected" : "navLink"}>My Cart</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
</div>
}

export default Heading;