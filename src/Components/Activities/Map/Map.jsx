import React from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export var entry=0;

export default function Map() {
	const notifyRegister = () => toast.success('You registered successfully', {
		theme: "dark",
		position: "top-right",
		autoClose: 2000,
		hideProgressBar: false,
		closeOnClick: true,
		progress: undefined,
		newestOnTop:false,
		rtl:false,
	}) + toast.clearWaitingQueue();

	const notifyLogin = () => toast.success('You logged in correctly', {
		theme: "dark",
		position: "top-right",
		autoClose: 2000,
		hideProgressBar: false,
		closeOnClick: true,
		progress: undefined,
		newestOnTop:false,
		rtl:false,
	}) + toast.clearWaitingQueue();

	if(entry===1){
		entry=0;
		setTimeout(() => {  notifyRegister(); }, 1000);
	}else if(entry===2){
		entry=0;
		setTimeout(() => {  notifyLogin(); }, 1000);
	}
	

	return (
		<div>
			<ToastContainer limit={1} />
			Map, main page?
		</div>
	);
}

export function SetEntry(number){
	entry = number;
}
