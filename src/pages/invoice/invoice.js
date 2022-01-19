// import "./newproduct.css";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { updateInvoice } from "../../axios";
import "./invoice.css";

export default function Invoice(props) {
  const [status, setstatus] = useState(props.lay.status);

  let navigate = useNavigate();
  const phay = (x) => {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x)) x = x.replace(pattern, "$1,$2");
    return x;
  };
  const map_log = (item) => {
    const ngaDate = new Date(item.updatedAt);
    const ngay = validateNiceNumber(ngaDate.getDate());
    const thang = validateNiceNumber(ngaDate.getMonth() + 1);
    const nam = ngaDate.getFullYear();
    const hour = validateNiceNumber(ngaDate.getHours());
    const mintes = validateNiceNumber(ngaDate.getMinutes());
    const s = validateNiceNumber(ngaDate.getSeconds());
    return (
      <div>
        <ui>
          Admin {item.user_id} chuyển {item.changeAction[1]} lúc {hour}:{mintes}
          :{s}s, {`${ngay}/${thang}/${nam}`}{" "}
        </ui>
      </div>
    );
  };
  const map_cart = (item, index) => {
    let string_name = "";
    let d = 0;
    for (let i = 0; i < item.product_id.name.length; i++) {
      if (d <= 5) {
        if (item.product_id.name[i] === " ") d++;
        if (d < 11) string_name += item.product_id.name[i];
      } else {
        string_name += "...";
        break;
      }
    }

    console.log(props.lay);

    return (
      <div className="sp1">
        <div className="soluong">{index + 1}.</div>

        <div style={{ flex: "1.3" }}>
          <img className="img_cart" alt="" src={item.product_id.img} />
        </div>

        <div style={{ flex: "3" }}>
          <div className="ten_cart">
            {string_name.charAt(0).toUpperCase() + string_name.slice(1)}
          </div>
          {/* <div>{sao(item.product_id.vote)}</div> */}
        </div>
        <div style={{ flex: "1.5" }}>
          {item.product_id.discountPrice > 0 ? (
            <div className="discount">
              <div style={{ display: "flex" }}>
                {phay(item.product_id.discountPrice)}
                <div className="d">đ</div>
              </div>
            </div>
          ) : (
            <div className="discount">
              {phay(item.product_id.listedPrice)}
              <div className="d">đ</div>
            </div>
          )}
        </div>
        <div style={{ flex: "1.5" }}>
          <input
            style={{ borderRadius: "10px" }}
            className="input_sl"
            type="text"
            readOnly={true}
            value={`x${item.quantity}`}
          ></input>
        </div>
        <div className="thanhTien">
          {phay(
            item.product_id.discountPrice > 0
              ? item.product_id.discountPrice * item.quantity
              : item.product_id.listedPrice * item.quantity
          )}
          <div className="d">đ</div>
        </div>
      </div>
    );
  };
  function validateNiceNumber(Number) {
    return Number < 10 ? "0" + Number : Number;
    //                     true             false
  }
  const submit = (e) => {
    e.preventDefault();
    let body = {
      id: props.lay._id,
      changeAction: ["status", status, props.lay.status],
    };
    updateInvoice(body).then((res) => {
      console.log(res.data);
      navigate("/invoice");
    });
  };
  const numberFormat = new Intl.NumberFormat(
    "vi-VN",
    {
      style: "currency",
      currency: "VND",
    } || undefined
  );
  const ngaDate = new Date(props.lay.createdAt);
  const ngay = validateNiceNumber(ngaDate.getDate());
  const thang = validateNiceNumber(ngaDate.getMonth() + 1);
  const nam = ngaDate.getFullYear();
  return (
    <div className="newProduct">
      <h1 className="addProductTitle">Invoice</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Status</label>
          <select
            value={status}
            onChange={(e) => {
              setstatus(e.target.value);
            }}
          >
            <option disabled={props.lay.status === "failed"}>pending</option>
            <option disabled={props.lay.status === "failed"}>
              in progress
            </option>
            <option disabled={props.lay.status === "failed"}>delivering</option>
            <option disabled={props.lay.status === "failed"}>delivered</option>
            <option disabled={props.lay.status === "failed"}>failed</option>
          </select>
        </div>
        <div
          // style={{ display: "flex", justifyContent: "space-between" }}
          className="cart"
        >
          <div style={{ width: "800px" }}>
            <div>{props.lay.products.map(map_cart)}</div>
            <div
              className="display"
              style={{
                backgroundColor: "white",
                marginLeft: "0px",
                padding: "10px",
              }}
            >
              <div>Ghi chú:</div>
              <div style={{ marginLeft: "10px", fontWeight: "600" }}>
                {props.lay.note}
              </div>
            </div>
          </div>
          <div className="ttI">
            <div className="display">
              <div>Thời gian mua:</div>
              <div
                style={{ marginLeft: "10px" }}
              >{`${ngay}/${thang}/${nam}`}</div>
            </div>
            <div className="display">
              <div>ID đơn hàng:</div>
              <div style={{ marginLeft: "10px", fontWeight: "600" }}>
                {props.lay._id}
              </div>
            </div>

            <div className="display">
              <div>Địa chỉ:</div>
              <div style={{ marginLeft: "10px", fontWeight: "600" }}>
                {props.lay.deliveryAddress}
              </div>
            </div>
            <div className="display">
              <div>Số tiền thanh toán:</div>
              <div
                style={{
                  marginLeft: "10px",
                  fontWeight: "600",
                  color: "red",
                }}
              >
                {numberFormat.format(
                  props.lay.totalDiscountPrice
                    ? props.lay.totalDiscountPrice
                    : props.lay.totalListPrice
                )}
              </div>
            </div>
            <div className="display">
              <div>Trạng thái:</div>
              <div
                style={{
                  marginLeft: "10px",
                  fontWeight: "600",
                  color: "orange",
                }}
              >
                {/* {props.lay.paymentStatus === "done"
                  ? "Đặt hàng thành công"
                  : "Đang xử lý..."} */}
                {props.lay.logs.map(map_log)}
              </div>
            </div>
          </div>
        </div>
        <div className="addProductItem ok">
          <div className="addProductButton" onClick={submit}>
            Update
          </div>
        </div>
      </form>
    </div>
  );
}
