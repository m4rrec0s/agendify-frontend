import React from "react";

interface UserPageProps {
  params: {
    id: string;
  };
}

const UserPage = ({ params }: UserPageProps) => {
  return (
    <section>
      <h1>User Page</h1>
      <p>User ID: {params.id}</p>
      <p>Testando o commit</p>
    </section>
  );
};

export default UserPage;
