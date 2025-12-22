import { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";

const Profile = () => {
  const { user, logout, sendVerificationCode, verifyEmailCode, resetEmail } =
    useContext(AuthContext);

  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [step, setStep] = useState(0);

  const [newChangedEmail, setNewChangedEmail] = useState("");

  const handleEmailChange = () => {
    setStep(1);
    setError("");
    setSuccess("");
  };

  const handleVerifyCode = async () => {
    try {
      await sendVerificationCode(email, "changeEmail");
      setStep(2);
      setError("");
    } catch (error) {
      setError(error.response?.data?.message || "error please try again");
    }
  };

  const handleCodeSubmit = async () => {
    try {
      const verified = await verifyEmailCode(email, code);
      if (verified) {
        setStep(3);
        setError("");
      } else {
        setError("Invalid verification code");
      }
    } catch (error) {
      setError(error.response?.data?.message || "error please try again");
    }
  };

  const handleNewEmailSubmit = async () => {
    if (newEmail === email) {
      setError("new email must be different from current one");
      return;
    }
    try {
      await resetEmail(email, newEmail);
      setSuccess("Email updated successfully!");
      setStep(0);
      setEmail("");
      setNewChangedEmail(newEmail);
      setCode("");
      setNewEmail("");
      setError("");
    } catch (error) {
      setError(error?.response?.data?.message || "failed to change email");
    }
  };

  const handleCancel = () => {
    setStep(0);
    setEmail("");
    setCode("");
    setNewEmail("");
    setError("");
    setSuccess("");
  };

  return (
    <div>
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="mb-2">
            Name: <span className="uppercase">{user?.name}</span>
          </h1>
          <h1 className="text-gray-300">
            Email: {newChangedEmail ? newChangedEmail : user?.email}
          </h1>
        </div>
        <div>
          <button
            className="px-4 py-2 bg-red-500 hover:bg-red-600 "
            onClick={logout}
          >
            Logout
          </button>
        </div>
      </div>

      <div className="mt-10">
        {step === 0 && (
          <button
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600"
            onClick={handleEmailChange}
          >
            Change Email
          </button>
        )}

        {error && <p className="text-red-400 mt-4">{error}</p>}
        {success && <p className="text-green-400 mt-4">{success}</p>}

        {step === 1 && (
          <div className="mt-4 space-y-4">
            <div>
              <label className="block text-gray-300 mb-2">Current Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your current email"
                className="outline-none w-fit px-3 py-2 border border-slate-500 bg-slate-800 text-slate-100 "
              />
            </div>
            <div className="flex gap-2">
              <button
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600    "
                onClick={handleVerifyCode}
              >
                Send Code
              </button>
              <button
                className="px-4 py-2 bg-gray-500 hover:bg-gray-600    "
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="mt-4 space-y-4">
            <p className="text-gray-400">
              Verification code has been sent to {email}
            </p>
            <div>
              <label className="block text-gray-300 mb-2">
                Verification Code
              </label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Enter verification code"
                className="outline-none w-fit px-3 py-2 border border-slate-500 bg-slate-800 text-slate-100    "
              />
            </div>
            <div className="flex gap-2">
              <button
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600    "
                onClick={handleCodeSubmit}
              >
                Verify
              </button>
              <button
                className="px-4 py-2 bg-gray-500 hover:bg-gray-600    "
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="mt-4 space-y-4">
            <p className="text-gray-400 mb-2">Email verified successfully!</p>
            <div>
              <label className="block text-gray-300 mb-2">New Email</label>
              <input
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                required
                placeholder="Enter new email"
                className="outline-none w-fit px-3 py-2 border border-slate-500 bg-slate-800 text-slate-100    "
              />
            </div>
            <div className="flex gap-2">
              <button
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600    "
                onClick={handleNewEmailSubmit}
              >
                Update Email
              </button>
              <button
                className="w-fit outline-none px-4 py-2 bg-gray-500 hover:bg-gray-600    "
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
