import { Register as RegisterProps, RegisterResponse} from "../../types";
import { RegistrationForm } from "../../components";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const onSubmit = async (data: RegisterProps) => {
    const fetching = await fetch(
      "https://mock-api.arikmpt.com/api/user/register",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );
    const response: RegisterResponse = await fetching.json();
    console.log(response);

    if (fetching.ok) {
      navigate("/");
    } else {
      console.error("Registration failed");
    }
  };

  return (
    <>
      <RegistrationForm onSubmit={onSubmit} />
    </>
  );
};

export default Register;