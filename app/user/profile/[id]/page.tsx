import React from "react";

interface UserPageProps {
  params: {
    id: string;
  };
}

const UserPage = async ({ params }: UserPageProps) => {
  const resolvedParams = await params;
  const userId = resolvedParams.id;

  return (
    <section>
      <h1>User Page</h1>
      <p>User ID: {userId}</p>
      <p>Testando o commit</p>
    </section>
  );
};

export default UserPage;
