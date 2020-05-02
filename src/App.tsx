import React, { useEffect, useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import InputMask from "react-input-mask";
import { Button } from "./styles";

function App() {
  const {
    control,
    reset,
    handleSubmit,
    watch,
    register,
    errors,
    getValues,
  } = useForm({
    mode: "onChange",
  });

  function onSubmit(data) {
    console.log(data);
  }

  const buttonDisabled = useMemo(() => {
    const cpf = getValues("cpf");
    const example = getValues("example");

    if (errors.cpf || errors.example) {
      console.log("true");
      return true;
    }

    if (!cpf || !example) {
      return true;
    }

    console.log("false");
    return false;
  }, [register, errors, watch("cpf"), watch("example")]);

  console.log(watch("cpf"));

  useEffect(() => {
    console.log("errors:", errors);
  }, [watch("cpf")]);

  return (
    <div style={{ height: "100vh", background: "#7159c1" }}>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <form autoComplete="false" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex" style={{ flexDirection: "column" }}>
            <label className="mt-3">Nome</label>
            <input
              className="mt-2 p-1"
              name="example"
              ref={register({
                minLength: 1,
                required: { value: true, message: "Esse campo é obrigatório" },
              })}
            />
            {errors?.example && <span>{errors?.example?.message}</span>}
            <label className="mt-3">CPF</label>
            <input
              className="mt-2 p-1"
              type="text"
              name="cpf"
              ref={register({
                pattern: {
                  value: /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/,
                  message: "CPF inválido",
                },
                required: {
                  value: true,
                  message: "Campo obrigatório",
                },
              })}
            />
            {errors?.cpf && <span>{errors?.cpf?.message}</span>}
            <label className="mt-3">Email</label>
            <input
              className="mt-3 p-1"
              type="text"
              name="email"
              ref={register({
                pattern: {
                  value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
                  message: "Email inválido",
                },
                required: {
                  value: true,
                  message: "Campo obrigatório",
                },
              })}
            />
            {errors?.email && <span>{errors?.email?.message}</span>}
            <label className="mt-3">Password</label>
            <input
              className="mt-3 p-1"
              type="password"
              name="password"
              ref={register({
                pattern: {
                  value: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/,
                  message: "Senha fraca",
                },
                required: {
                  value: true,
                  message: "Campo obrigatório",
                },
              })}
            />
            {errors?.password && <span>{errors?.password?.message}</span>}
            <Button
              className="mt-4 p-1"
              type="submit"
              // disabled={buttonDisabled}
            >
              Send
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
