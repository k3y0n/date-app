import { useState } from "react";
import LoginForm from "../components/ui/LoginForm/LoginForm";
import RegisterForm from "../components/ui/RegisterForm/RegisterForm";
import { useParams } from "react-router-dom";

const Login = () => {
  const { type } = useParams();
  const state = type === "register" ? "register" : "login";
  const [formType, setFormType] = useState(state);
  const title = formType === "register" ? "Регистрация" : "Авторизация";

  const toggleForm = () => {
    setFormType((prev) => (prev === "register" ? "login" : "register"));
  };

  return (
    <div className="container-sm mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
          <h3 className="mb-3">{title}</h3>
          {formType === "login" ? (
            <>
              <LoginForm />
              <p>
                Нет аккаунта ?
                <a type="button" onClick={toggleForm}>
                  Зарегистрироваться
                </a>
              </p>
            </>
          ) : (
            <>
              <RegisterForm />
              <p>
                У вас уже есть аккаунт ?
                <a type="button" onClick={toggleForm}>
                  Войти
                </a>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
