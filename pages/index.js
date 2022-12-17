import { Row, Modal } from "antd";
import Head from "next/head";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import Layout from "../components/Layout";
import { UserForm } from "../components/UserForm";
import UsersItem from "../components/UserItem";

export const handleFavorite = (currentFavorites, id) =>
  currentFavorites?.includes(id)
    ? currentFavorites.filter((favId) => favId !== id)
    : [...currentFavorites, id];

export const deleteUser = (currentUsers, id) =>
  currentUsers.filter((user) => user.id !== id);

export const getEditedUserFrom = (currentUsers, details) => {
  const userIndex = currentUsers.findIndex((user) => user.id === details.id);
  if (userIndex < 0) {
    return;
  }
  Object.keys(details).forEach((detailkey) => {
    currentUsers[userIndex][detailkey] = details[detailkey];
  });
  return [...currentUsers];
};
export default function Home() {
  const [users, setUsers] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [formState, setFormState] = useState({});

  const fetchData = useCallback(() => {
    fetch("https://jsonplaceholder.typicode.com/users").then((res) =>
      res
        .json()
        .then((data) => setUsers(data))
        .catch((err) => console.log(err))
    );
  }, []);
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  const getUserdata = useCallback(
    (id) => {
      return users.find((user) => user.id === id);
    },
    [users]
  );

  const onEdit = () => {
    fetch(`https://jsonplaceholder.typicode.com/users/${formState.id}`, {
      method: "PUT",
      body: JSON.stringify({
        name: formState.name,
        email: formState.email,
        phone: formState.phone,
        web: formState.website,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => {
        if (response.status !== 200) {
          return;
        } else {
          return response.json();
        }
      })
      .then((data) => {
        const newUsers = getEditedUserFrom(users, formState);
        setUsers(newUsers);
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setModalOpen(false);
      });
  };
  const handleFormChange = useCallback((e) => {
    setFormState((curr) => ({ ...curr, [e.target.name]: e.target.value }));
  }, []);
  const onDelete = useCallback(
    (id) => {
      fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
        method: "DELETE",
      })
        .then((res) => {
          if (res.status !== 200) {
            return;
          } else {
            return res.json();
          }
        })
        .then((data) => {
          const deletedUsers = deleteUser(users, id);
          setUsers(deletedUsers);
        })
        .catch((err) => console.log(err));
    },
    [users]
  );
  const handleFav = useCallback(
    (id) => {
      const newFavorites = handleFavorite(favorites, id);
      setFavorites(newFavorites);
    },
    [favorites]
  );

  return (
    <>
      <Layout>
        <div className="site-card-wrapper">
          <Row gutter={20}>
            {users?.map((user) => (
              <UsersItem
                key={user.id}
                userDetails={user}
                handleEdit={() => {
                  setFormState(getUserdata(user.id));
                  setModalOpen(true);
                }}
                handleDelete={() => onDelete(user.id)}
                isFavorite={favorites.includes(user.id)}
                handleFavorite={() => handleFav(user.id)}
              />
            ))}
          </Row>

          <Modal
            title="Edit User"
            style={{ top: 20 }}
            okText="Submit"
            open={modalOpen}
            onOk={onEdit}
            onCancel={() => setModalOpen(false)}
          >
            <UserForm
              handleEdit={onEdit}
              formState={formState}
              handleFormChange={handleFormChange}
            />
          </Modal>

          <style jsx>{`
            .site-card-wrapper {
              padding: 3vw;
            }
          `}</style>
        </div>
      </Layout>
    </>
  );
}
