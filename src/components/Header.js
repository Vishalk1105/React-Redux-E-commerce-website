import React, { useEffect, useState, useCallback } from "react";
import Badge from "@mui/material/Badge";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { NavLink } from "react-router-dom";
import { Button, Table } from "react-bootstrap";
import cart from "../assets/cart.svg";
import { useDispatch, useSelector } from "react-redux";
import { DLT } from "../redux/actions/action";
export const Header = () => {
  const [price, setPrice] = useState(0);
  const getData = useSelector((state) => state.cartreducer.carts);
  // console.log(getData);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const dispatch = useDispatch();

  const dlt = (id) => {
    dispatch(DLT(id));
  };

  const total = useCallback(() => {
    let price = 0;
    getData.map((ele) => {
      return (price = ele.price * ele.qnty + price);
    });
    setPrice(price);
  }, [getData]);

  useEffect(() => {
    total();
  }, [total]);
  return (
    <div>
      <Navbar bg="dark" variant="dark" style={{ height: "80px" }}>
        <Container>
          <NavLink to={"/"} className="text-decoration-none text-light mx-3">
            Add To Cart
          </NavLink>
          <Nav className="me-auto">
            <NavLink to={"/"} className="text-decoration-none text-light">
              Home
            </NavLink>
          </Nav>
          <Badge
            badgeContent={getData.length}
            color="primary"
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <i
              className="fa-solid fa-cart-shopping text-light"
              style={{ fontSize: 25, cursor: "pointer" }}
            ></i>
          </Badge>
        </Container>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          {getData.length ? (
            <div
              className="card_details"
              style={{ width: "24rem", padding: 10 }}
            >
              <Table>
                <thead>
                  <tr>
                    <th>Photo</th>
                    <th>Restaurant Name</th>
                  </tr>
                </thead>
                <tbody>
                  {getData.map((e) => {
                    return (
                      <tr>
                        <NavLink to={`/cart/${e.id}`} onClick={handleClose}>
                          <td>
                            <img
                              src={e.imgdata}
                              style={{ width: "8rem", height: "8rem" }}
                              alt=""
                            />
                          </td>
                        </NavLink>
                        <td>
                          <p>{e.rname}</p>
                          <p>Price : ₹ {e.price}</p>
                          <p>Quantity : {e.qnty}</p>
                          <p
                            style={{
                              color: "red",
                              fontSize: 20,
                              cursor: "pointer",
                            }}
                            onClick={() => dlt(e.id)}
                          >
                            <i className="fas fa-trash smalltrash"></i>
                          </p>
                        </td>
                        <td
                          className="mt-5"
                          style={{
                            color: "red",
                            fontSize: 20,
                            cursor: "pointer",
                          }}
                          onClick={() => dlt(e.id)}
                        >
                          <i className="fas fa-trash largetrash"></i>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <p className="text-center">Total :₹ {price}</p>
              </Table>
            </div>
          ) : (
            <div
              className="card_details d-flex justify-content-center align-item-center"
              style={{ width: "24rem", position: "relative", padding: 10 }}
            >
              <i
                className="fas fa-close smallClose"
                style={{
                  position: "absolute",
                  top: 2,
                  right: 20,
                  fontSize: 23,
                  cursor: "pointer",
                }}
                onClick={handleClose}
              ></i>
              <p style={{ fontSize: 22 }} className="align-middle">
                {" "}
                Your Cart is Empty
              </p>
              <img
                src={cart}
                alt=""
                className="emptycart_img"
                style={{ width: "5rem", padding: 10 }}
              />
            </div>
          )}
        </Menu>
      </Navbar>
    </div>
  );
};
