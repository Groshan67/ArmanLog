import React from "react";
import Card from "react-bootstrap/Card";
const Test = () => {
  return (
    <>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "500px", minWidth: "600px" }}
      >
        <Card>
          <Card.Body>
            <Card.Text className="text-center">
              <b>تنظیمات</b>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default Test;
