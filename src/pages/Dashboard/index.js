import React, {useContext} from "react";
import { AuthContext }  from '../../contexts/auth';

export default function dashboard() {
  const { signOut } = useContext(AuthContext);

  return (
    <div><h1>dashboard page</h1>
      <button onClick={() => signOut()}>Logout</button>
    </div>
  );
}
