import React, {useContext} from "react";
import { AuthContext }  from '../../contexts/auth';
import Header from "../../components/Header";

export default function dashboard() {

  return (
    <div>
      <Header/>
      <h1>dashboard page</h1>
    </div>
  );
}
