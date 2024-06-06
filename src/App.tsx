import { Route, Routes } from 'react-router-dom';
import { Dashboard, Dlogin, Dsignup, Plogin, Psignup } from './components';

function App() {
	return (
		<main>
			<Routes>
				{/* patient login */}
				<Route path='/patients/login' element={<Plogin />} />
				{/* patient signup */}
				<Route path='/patients/signup' element={<Psignup />} />

				{/* doctors login */}
				<Route path='/doctors/login' element={<Dlogin />} />

				{/* doctors signup */}
				<Route path='/doctors/signup' element={<Dsignup />} />
				{/* dashboard poage */}
				<Route path='/' element={<Dashboard />} />
			</Routes>
		</main>
	);
}

export default App;
