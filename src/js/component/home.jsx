import React, {useState} from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	let [toDoList, setToDoList] = useState([])
	const [newTask, setNewTask] = useState("")

	return (
		<div className="container mt-5">
			<h1 className="text-center">To-do's</h1>
			<div className="mx-auto col-6 ">
				<input type="text" className="form-control" placeholder="¿Que necesitas hacer?" 
				value={newTask} onChange={(evento) => {
						setNewTask(evento.target.value)
					}} onKeyUp={(evento) => {
						if (evento.key == "Enter") {
							setToDoList([...toDoList, newTask ]);
							setNewTask("");
						}
					}}/>
				<ul className="border rounded p-0 my-2 ">
					{toDoList.map((item, index) => {
						return (
							<li className="border border-rounded ps-3 py-2 d-flex justify-content-between" key={index}>
								{item} <i onClick={() => {
									const aux = toDoList.filter((item, ind) =>{
										return (ind != index)
									})
									setToDoList(aux);
								}}
								className="fa-solid fa-trash fa-sm oculto my-auto me-2" ></i>
							</li>
							
						)
					})}
				</ul>
				<span className="ms-2 small">{(toDoList.length > 0 ? toDoList.length + " items left": "No tasks, add a task")}</span>
			</div>
			
		</div>
	);
};

export default Home;
