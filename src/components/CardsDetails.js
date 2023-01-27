import React, { useEffect } from "react";
import { Table } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import "./style.css";
export default function CardsDetails() {

  const { id } = useParams();

  const getData = useSelector((state) => state.cartreducer.carts);
  // console.log(getData);

  const compare = () => {
    let compareData = getData.filter((e) => {
      return e.id === id
    })
    console.log(compareData)
  }
  useEffect(() => {
    compare();
  }, [id])
  
  return (
    <>
      <div className="container mt-2">
        <h2 className="text-center">Items Details Page</h2>

        <section className="container mt-3">
          <div className="iteamsdetails">
            <div className="items_img">
              <img
                src="https://b.zmtcdn.com/data/pictures/9/18857339/8f53919f1175c08cf0f0371b73704f9b_o2_featured_v2.jpg?output-format=webp"
                alt=""
              />
            </div>
            <div className="details">
              <Table>
                <tr>
                  <td>
                    <p>
                      <strong>Restaurant</strong> : Massala Theorry
                    </p>
                    <p>
                      <strong>Price</strong> : ₹ 300
                    </p>
                    <p>
                      <strong>Dishes</strong> : north Indian, Biryani, Mughlai
                    </p>
                    <p>
                      <strong>Total</strong> : ₹ 300
                    </p>
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
                        3.5★
                      </span>
                    </p>
                    <p>
                      <strong>Order Review : </strong>
                      <span>1175+ Order placed From here recently</span>
                    </p>
                    <p>
                      <strong>Remove : </strong>
                      <span><i className="fas fa-trash" style={{color:"red", fontSize:20, cursor:"pointer"}}></i></span>
                    </p>
                  </td>
                </tr>
              </Table>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
