import {
	BrowserRouter as Router,
	useRoutes
  } from 'react-router-dom';
import Main from "./components/Main";
import Signup from "./components/Singup";
import Login from "./components/Login";

function AppRoutes() {
	const routes = useRoutes(
	  [
		  {path:'/signup',element:<Signup/>},
		  {path:'/login',element:<Login/>},
		{path:"/" ,element:<Main />},
	  ]
	)
	return routes;
  }

function App() {
	const user = localStorage.getItem("token");

	return (
		<Router>
			<AppRoutes/>
		</Router>
	);
}

export default App;
