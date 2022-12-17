import { Avatar, Card, Col, Row, Modal, Form, Input, Button } from "antd";
export const UserForm = ({ handleEdit, formState, handleFormChange }) => {
  const { username, email, phone, website } = formState;
  return (
    <>
      <Form onSubmit={handleEdit} className="Formfill">
        <div className="form-container">
          <div className="form-left">
            <label htmlFor="name">Name</label> <br></br>
            <label htmlFor="email">Email</label> <br />
            <label htmlFor="phone">Phone</label>
            <br />
            <label htmlFor="web">Website</label>
          </div>
          <div className="form-right">
            <input
              type="text"
              id="username"
              name="username"
              onChange={handleFormChange}
              value={username}
            />
            <br />
            <input
              type="text"
              id="email"
              name="email"
              value={email}
              onChange={handleFormChange}
            />
            <br />
            <input
              type="text"
              placeholder="phone"
              name="phone"
              value={phone}
              onChange={handleFormChange}
            />
            <br />
            <input
              type="text"
              placeholder="web"
              name="website"
              onChange={handleFormChange}
              value={website}
            />
          </div>
        </div>

        <br />
      </Form>
      <style jsx>{`
        .form-container {
          display: flex;
          flex-direction: row;
          padding: 20px;
          justify: space-between;
        }
        .form-right {
          padding-left: 20px;
        }
        input {
          width: 300px;
          height: 20px;
        }
      `}</style>
    </>
  );
};
