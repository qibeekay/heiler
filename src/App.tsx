import { Route, Routes } from 'react-router-dom';
import {
	Chats,
	Dashboard,
	Dlogin,
	DoctorsBySpecialty,
	Dsignup,
	FindDoctors,
	Plogin,
	Psignup,
	SingleChats,
	VerifyEmail,
} from './components';

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

				<Route path='/verify-email' element={<VerifyEmail />} />

				{/* dashboard poage */}
				<Route path='/' element={<Dashboard />} />

				{/* find doctors page */}
				<Route path='/find-doctor' element={<FindDoctors />} />
				{/* find doctors by specialty */}
				<Route
					path='/find-doctor/:specialty'
					element={<DoctorsBySpecialty />}
				/>

				{/* chat */}
				<Route path='/chats' element={<Chats />} />
				{/* singlechats */}
				<Route path='/chats/:id' element={<SingleChats />} />
			</Routes>
		</main>
	);
}

export default App;
