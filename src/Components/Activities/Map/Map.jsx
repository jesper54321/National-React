import React from "react";
import { username,email } from "../../../Wrappers/AuthProvider";

export default function Map() {
	return <div>Map, you logged in {username} with email {email} </div>;
}
