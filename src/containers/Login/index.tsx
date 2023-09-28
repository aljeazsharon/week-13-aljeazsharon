import LoginForm from '../../components/Login'
import { LoginResponse, Login as LoginProps } from "../../types";

const Login = () => {
  const onSubmit = async (data: LoginProps) => {
    const fetching = await fetch("https://mock-api.arikmpt.com/api/user/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );
    const response: LoginResponse = await fetching.json();
    console.log(response);

    if (response) {
      sessionStorage.setItem("token", response.data.token);
      window.location.replace("/category");
    }
  };

  return (
    <>
      <LoginForm onSubmit={onSubmit} />
    </>
  );
};

export default Login;