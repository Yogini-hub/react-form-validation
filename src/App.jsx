import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from "react-router-dom";

function Input({ label, error, type="text", ...props }) {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="text-sm font-medium">{label}</label>
      <input
        {...props}
        type={type}
        className={`border rounded-xl p-2 outline-none transition ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      />
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}

function FormPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    phone: "",
    countryCode: "+91",
    country: "",
    city: "",
    pan: "",
    aadhaar: "",
  });

  const [touched, setTouched] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleBlur = (e) => {
    setTouched({ ...touched, [e.target.name]: true });
  };

  const errors = {
    firstName: !form.firstName ? "First name is required" : "",
    lastName: !form.lastName ? "Last name is required" : "",
    username: !form.username ? "Username is required" : "",
    email: !/^\S+@\S+\.\S+$/.test(form.email) ? "Valid email required" : "",
    password: form.password.length < 6 ? "Min 6 characters" : "",
    phone: form.phone.length < 10 ? "Valid phone required" : "",
    country: !form.country ? "Country is required" : "",
    city: !form.city ? "City is required" : "",
    pan: !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(form.pan) ? "Invalid PAN" : "",
    aadhaar: form.aadhaar.length !== 12 ? "Aadhaar must be 12 digits" : "",
  };

  const isValid = Object.values(errors).every((e) => e === "");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) return;
    navigate("/details", { state: form });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-md w-full max-w-xl grid gap-4"
      >
        <h1 className="text-xl font-semibold text-center">Registration Form</h1>

        <div className="grid md:grid-cols-2 gap-4">
          <Input label="First Name" name="firstName" value={form.firstName} onChange={handleChange} onBlur={handleBlur} error={touched.firstName && errors.firstName} />
          <Input label="Last Name" name="lastName" value={form.lastName} onChange={handleChange} onBlur={handleBlur} error={touched.lastName && errors.lastName} />
        </div>

        <Input label="Username" name="username" value={form.username} onChange={handleChange} onBlur={handleBlur} error={touched.username && errors.username} />
        <Input label="Email" name="email" value={form.email} onChange={handleChange} onBlur={handleBlur} error={touched.email && errors.email} />

        <div className="flex gap-2 items-end">
          <Input
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={form.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.password && errors.password}
          />
          <button
            type="button"
            className="border rounded-xl px-3 py-2 text-sm"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <Input label="Code" name="countryCode" value={form.countryCode} onChange={handleChange} />
          <Input
            label="Phone"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.phone && errors.phone}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <Input label="Country" name="country" value={form.country} onChange={handleChange} onBlur={handleBlur} error={touched.country && errors.country} />
          <Input label="City" name="city" value={form.city} onChange={handleChange} onBlur={handleBlur} error={touched.city && errors.city} />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <Input label="PAN" name="pan" value={form.pan} onChange={handleChange} onBlur={handleBlur} error={touched.pan && errors.pan} />
          <Input label="Aadhaar" name="aadhaar" value={form.aadhaar} onChange={handleChange} onBlur={handleBlur} error={touched.aadhaar && errors.aadhaar} />
        </div>

        <button
          type="submit"
          disabled={!isValid}
          className={`mt-4 p-2 rounded-xl text-white ${
            !isValid ? "bg-gray-400" : "bg-black"
          }`}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

function DetailsPage() {
  const location = useLocation();
  const data = location.state;

  if (!data) return <div className="p-4">No Data Found</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-xl">
        <h2 className="text-xl font-semibold mb-4">Submitted Details</h2>
        {Object.entries(data).map(([key, value]) => (
          <div key={key} className="flex justify-between border-b py-2 text-sm">
            <span className="font-medium capitalize">{key}</span>
            <span>{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FormPage />} />
        <Route path="/details" element={<DetailsPage />} />
      </Routes>
    </Router>
  );
}
