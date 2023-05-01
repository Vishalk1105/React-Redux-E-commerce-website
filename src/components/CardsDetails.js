import React, { useEffect, useState, Fragment, useCallback } from "react";
import { Table } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./style.css";
import { DLT, REMOVE, ADD } from "../redux/actions/action";

export default function CardsDetails() {
  const [data, setData] = useState([]);
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useNavigate();
  const getData = useSelector((state) => state.cartreducer.carts);

  const compare = useCallback(() => {
    const compareData =
      getData &&
      getData.filter((e) => {
        return e.id === parseInt(id);
      });
    setData(compareData, "data");
  }, [getData, id]);

  useEffect(() => {
    compare();
  }, [compare]);

  const dlt = (id) => {
    dispatch(DLT(id));
    history("/");
  };

  const send = (e) => {
    // console.log(e)
    dispatch(ADD(e));
  };

  const removeItem = (e) => {
    dispatch(REMOVE(e));
  };

  return (
    <div className="container mt-2">
      <h2 className="text-center">Items Details Page</h2>

      <section className="container mt-3">
        <div className="iteamsdetails">
          {data.map((item) => {
            return (
              <Fragment>
                <div className="items_img">
                  <img src={item.imgdata} alt="" />
                </div>
                <div className="details">
                  <Table>
                    <tr>
                      <td>
                        <p>
                          <strong>Restaurant</strong> : {item.rname}
                        </p>
                        <p>
                          <strong>Price</strong> : ₹ {item.price}
                        </p>
                        <p>
                          <strong>Dishes</strong> : {item.address}
                        </p>
                        <p>
                          <strong>Total</strong> : ₹ {item.price * item.qnty}
                        </p>
                        <div
                          className="mt-5 d-flex justify-content-between align-items-center"
                          style={{
                            width: "100",
                            cursor: "pointer",
                            background: "#ddd",
                            color: "#111",
                          }}
                        >
                          <span
                            style={{ fontSize: 24 }}
                            onClick={
                              item.qnty <= 1
                                ? () => dlt(item.id)
                                : () => removeItem(item)
                            }
                          >
                            -
                          </span>
                          <span style={{ fontSize: 22 }}>{item.qnty}</span>
                          <span
                            style={{ fontSize: 24 }}
                            onClick={() => send(item)}
                          >
                            +
                          </span>
                        </div>
                      </td>
                      <td>
                        <p>
                          <strong>Rating : </strong>
                          <span
                            style={{
                              width: 135,
                              backgroundColor: "green",
                              color: "#fff",
                              padding: "2px 5px",
                              borderRadius: "5px",
                            }}
                          >
                            {item.rating}★
                          </span>
                        </p>
                        <p>
                          <strong>Order Review : </strong>
                          <span>{item.somedata}</span>
                        </p>
                        <p>
                          <strong>Remove : </strong>
                          <span>
                            <i
                              className="fas fa-trash"
                              style={{
                                color: "red",
                                fontSize: 20,
                                cursor: "pointer",
                              }}
                              onClick={() => dlt(item.id)}
                            ></i>
                          </span>
                        </p>
                      </td>
                    </tr>
                  </Table>
                </div>
              </Fragment>
            );
          })}
        </div>
      </section>
    </div>
  );
}
