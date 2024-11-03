import React, { useState, useEffect } from "react";

const urlbase = "https://playground.4geeks.com/todo/";

const Home = () => {
	let [toDoList, setToDoList] = useState([])
	const [newTask, setNewTask] = useState({
		label: "",
		is_done: false
	})

	const handleChange = (event) => {
		setNewTask({
			...newTask,
			label: event.target.value
		})
	}

	const addTask = async (event) => {
		if (event.key == "Enter") {
			try {
				let response = await fetch(`${urlbase}todos/manu`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(newTask)
				})
				if (response.ok) {
					getTasks();
				}
			} catch (error) {
				console.log(error);
			}
			setNewTask("");
			event.target.value = "";
		}
	}

	const deleteTask = async (id) => {
		let response = await fetch(`${urlbase}todos/${id}`, {
			method: "DELETE",
		});

		if (response.ok) {
			getTasks();
		} else {
			console.log(error);
		}
	}

	const getTasks = async () => {
		try {
			let response = await fetch(`${urlbase}users/manu`);
			let data = await response.json();
			if (response.ok) {
				setToDoList(data.todos);
			} else {
				console.log("se debe crear el usuario");
			}
		} catch (error) {
			console.log(error)
		}
	}
	useEffect(() => {
		getTasks();
	}, [])

	return (
		<>
			<h1 className="text-center mt-5 ">todos</h1>
			<div className="list container d-flex flex-column mt-2 align-items-center">
				<ul className="p-0 my-0 align-items-center">
					<li className="border border-bottom-0 col-12 ps-3 py-2 ">
						<input
							type="text"
							placeholder="¿Que necesitas hacer?"
							className="border-0 me-auto"
							value={newTask.label}
							name="label"
							onChange={handleChange}
							onKeyUp={addTask}
						/>
					</li>
					{
						toDoList.map((item, index) => (
							<>
								<li className="border border-bottom-0 ps-3 py-2 d-flex justify-content-between" key={index}>
									{item.label}
									<i
										onClick={() => deleteTask(item.id)}
										className="fa-solid fa-trash fa-sm oculto my-auto me-2">
									</i>
								</li>
							</>
						))
					}
					<li className="border ps-3 py-1 d-flex justify-content-between">
						<span class="small">{(toDoList.length > 0 ? toDoList.length + " items left" : "No tasks, add a task")}</span>
					</li>

				</ul>
				<div className="marco1 pt-1 border border-top-0"></div>
				<div className="marco2 pt-1 border border-top-0"></div>
			</div>
		</>
	);
};

export default Home;
