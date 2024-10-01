import { Route, Routes } from "react-router-dom";
import {
  Chats,
  Dashboard,
  Dlogin,
  DoctorsBySpecialty,
  Dsignup,
  FindDoctors,
  MedicalRecord,
  Onboarding,
  Plogin,
  Profile,
  Psignup,
  SingleChats,
  VerifyEmail,
} from "./components";
import FindPatients from "./pages/FindPatients";

function App() {
  return (
    <main>
      <Routes>
        {/* onboarding screen */}
        <Route path="/onboarding" element={<Onboarding />} />
        {/* patient login */}
        <Route path="/patients/login" element={<Plogin />} />
        {/* patient signup */}
        <Route path="/patients/signup" element={<Psignup />} />

        {/* doctors login */}
        <Route path="/doctors/login" element={<Dlogin />} />

        {/* doctors signup */}
        <Route path="/doctors/signup" element={<Dsignup />} />

        <Route path="/verify-email" element={<VerifyEmail />} />

        {/* dashboard poage */}
        <Route path="/" element={<Dashboard />} />

        {/* find doctors page */}
        <Route path="/find-doctor" element={<FindDoctors />} />

        {/* find patients page */}
        <Route path="/find-patient" element={<FindPatients />} />

        {/* find doctors by specialty */}
        <Route
          path="/find-doctor/:specialty"
          element={<DoctorsBySpecialty />}
        />
        {/* view patients medical record */}
        <Route path="/find-patient/:id" element={<MedicalRecord />} />

        {/* doctors profile */}
        <Route path="/profile" element={<Profile />} />

        {/* chat */}
        <Route path="/chats" element={<Chats />} />
        {/* singlechats */}
        <Route path="/chats/:id" element={<SingleChats />} />
      </Routes>
    </main>
  );
}

export default App;
