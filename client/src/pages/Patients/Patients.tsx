import React, { useState } from "react";
import axios from "axios"; // Make sure to install axios: npm install axios
import styles from "./patient.module.css";
import logo from "../../../public/assets/logo.png";
import Tilt from "react-parallax-tilt";
import { useNavigate } from "react-router-dom";

const Doctors = () => {
	const navigate = useNavigate();

	const doctorsData = [
		{ id: 1, name: "Patient 1", description: "Has high BP" },
		{ id: 2, name: "Patient 2", description: "Needs a cardio surgery" },
		{ id: 3, name: "Patient 3", description: "Childs health enquiry" },
		{ id: 4, name: "Patient 4", description: "Urgent orthopedic surgery" },
	];

	const [appointmentTime, setAppointmentTime] = useState(getDefaultTime());

	// Function to calculate default time (1 day from the current time)
	function getDefaultTime() {
		const currentDate = new Date();
		currentDate.setDate(currentDate.getDate() + 1);

		const year = currentDate.getFullYear();
		const month = String(currentDate.getMonth() + 1).padStart(2, "0");
		const day = String(currentDate.getDate()).padStart(2, "0");
		const hours = String(currentDate.getHours()).padStart(2, "0");
		const minutes = String(currentDate.getMinutes()).padStart(2, "0");

		return `${year}-${month}-${day}T${hours}:${minutes}`;
	}

	// Function to handle "Make Appointment" button click
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const handleMakeAppointment = async (doctorId:number) => {
		navigate("/report");
		try {
			// Send a POST request to your backend with the doctorId and appointmentTime
			const response = await axios.post("/api/makeAppointment", {
				doctorId,
				appointmentTime,
			});

			// Handle the response accordingly (e.g., show success message)
			console.log("Appointment made successfully:", response.data);
		} catch (error) {
			// Handle errors (e.g., show error message)
			console.error("Error making appointment:", error.message);
		}
	};

	return (
		<div className={styles.container}>
			<img className="absolute z-0 opacity-20 " src={logo} alt="Logo" />
			<div>
				<div className="text-7xl font-extrabold z-10 flex w-full items-center gap-24 justify-evenly ">
          BIO LINK
					<div className="text-5xl font-thin  text-black0">
                        Patients to be attended
					</div>
				</div>
			</div>

			<div className="flex flex-wrap gap-24 w-[90vw] justify-center z-40">
				{doctorsData.map((doctor) => (
					<Tilt glareEnable={true} tiltMaxAngleX={3} tiltMaxAngleY={3} key={13}>
						<div
							key={doctor.id}
							className="w-[500px] h-[250px] relative bg-slate-900 z-20 rounded-xl"
						>
							<div>
								<div className="text-3xl font-bold text-slate-200 p-4">
									{doctor.name}
								</div>
								<p className="text-slate-200 p-4">{doctor.description}</p>
							</div>

							<input
								type="datetime-local"
								className="flex absolute bottom-6 left-4 bg-slate-700 text-slate-100 py-2 px-4 rounded-lg"
								defaultValue={appointmentTime}
								onChange={(e) => setAppointmentTime(e.target.value)}
							></input>

							<button
								className="flex absolute bottom-6 right-4 bg-lime-300 py-2 px-4 rounded-lg"
								onClick={() => handleMakeAppointment(doctor.id)}
							>
                                View Report
							</button>
						</div>
					</Tilt>
				))}
			</div>
		</div>
	);
};

export default Doctors;

