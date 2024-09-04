import React, { useEffect, useState } from "react";
import DeleteWarning from "./DeleteWarning";

const DeleteAcc: React.FC = () => {
  const [warning, setWarning] = useState(false);

  const handleDelete = async (): Promise<void> => {
    setWarning(true);
  };

  return (
    <>
      <div className="text-gray-300 hover:text-red-500">
        <button onClick={handleDelete}>Delete Account</button>
      </div>
      {warning && <DeleteWarning warning={warning} setWarning={setWarning} />}
    </>
  );
};

export default DeleteAcc;
