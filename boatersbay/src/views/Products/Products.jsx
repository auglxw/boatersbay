import React, { useState, useEffect } from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import "./Products.css";
import Heading from "../../components/Heading/Heading";
import FilterBar from "../../components/FilterBar/FilterBar";
import { db } from "../../firebase";
import { onValue, ref } from "firebase/database";

function Products() {
  const [title, updateTitle] = useState("Products");
  const [products, updateProducts] = useState([]);
  const [filteredProducts, updateFilteredProducts] = useState({});
  const [productCategories, updateProductCategories] = useState(["All Products"]);

  useEffect(() => {
    const query = ref(db, "Products");
    return onValue(query, (snapshot) => {
      const data = snapshot.val();
      const productcats = ["All Products", ...Object.keys(data)];
      updateProductCategories(productcats);
      updateProducts(data);
      var filteredProductsTemp = {};
      for (var i = 0; i < productcats.length; i++) {
          if (productcats[i] === "All Products") {
              continue;
          }
          filteredProductsTemp = {...filteredProductsTemp, ...data[productcats[i]]}
          if (i === productcats.length - 1) {
            updateFilteredProducts(filteredProductsTemp);
          }
      }
    });
  }, []);

  function handleFilteredProducts(filter) {
      if (filter === "All Products") {
        var filteredProductsTemp = {};
        for (var i = 0; i < productCategories.length; i++) {
            if (productCategories[i] === "All Products") {
                continue;
            }
            filteredProductsTemp = {...filteredProductsTemp, ...products[productCategories[i]]}
        }
        updateFilteredProducts({...filteredProductsTemp});
      } else {
        updateFilteredProducts({...products[filter]});
      }
  }

  return (
    <div>
      <Heading choice={"Products"} />
      <Container fluid className="cardGroup">
        <FilterBar label="Category" options={productCategories} callback={handleFilteredProducts} />
        <p className="pageTitle product-page-title">{title}</p>
        <Row className="cardRow">
          {filteredProducts && Object.keys(filteredProducts).map((productId, idx) => {
            return (
              <Col lg={4} sm={12} className="cardCol" key={idx}>
                <Card className="card">
                  <Card.Img variant="top" src={require("../../img/boat.jpg")} />
                  <Card.Body>
                    <Card.Title>{filteredProducts[productId]?.name}</Card.Title>
                    <Card.Text>{filteredProducts[productId]?.description}</Card.Text>
                    <Button variant="secondary" href={"/products/" + productId}>
                      View Product
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </div>
  );
}

export default Products;
