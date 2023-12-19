import "./App.css";
import { z, ZodType } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
type FormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  age: number;
};

const App = () => {
  const schema: ZodType<FormData> = z
    .object({
      name: z.string().min(2).max(30),
      email: z.string().email(),
      password: z.string().min(6).max(20),
      age: z.number().min(18),
      confirmPassword: z.string().min(6).max(20),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Password do not match",
      path: ["confirmPassword"],
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
    // setError, // use setError for setError that comes from backend and then display theme in form
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const HandleForm = (e: FormData) => {
    console.log(e);
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit(HandleForm)}
        style={{
          border: "1px solid #ccc",
          borderRadius: "10Px",
          padding: "15px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <h1>Register</h1>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            textAlign: "left",
          }}
        >
          <label htmlFor="name">Name</label>
          <input
            {...register("name")}
            style={{ padding: "5px 10px" }}
            type="text"
            placeholder="Name"
          />{" "}
          {errors.name && (
            <span style={{ color: "red" }}>{errors.name.message}</span>
          )}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            textAlign: "left",
          }}
        >
          <label htmlFor="email">Email</label>
          <input
            {...register("email")}
            style={{ padding: "5px 10px" }}
            type="email"
            placeholder="Email"
          />{" "}
          {errors.email && (
            <span style={{ color: "red" }}>{errors.email.message}</span>
          )}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            textAlign: "left",
          }}
        >
          <label htmlFor="password">Password</label>
          <input
            {...register("password")}
            style={{ padding: "5px 10px" }}
            type="password"
            placeholder="Password"
          />{" "}
          {errors.password && (
            <span style={{ color: "red" }}>{errors.password.message}</span>
          )}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            textAlign: "left",
          }}
        >
          <label htmlFor="Confirm">Confirm Password</label>
          <input
            {...register("confirmPassword")}
            style={{ padding: "5px 10px" }}
            type="password"
            placeholder="Confirm Password"
          />{" "}
          {errors.confirmPassword && (
            <span style={{ color: "red" }}>
              {errors.confirmPassword.message}
            </span>
          )}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            textAlign: "left",
          }}
        >
          <label htmlFor="age">Age</label>
          <input
            {...register("age", { valueAsNumber: true })}
            style={{ padding: "5px 10px" }}
            type="number"
            placeholder="Age"
          />{" "}
          {errors.age && (
            <span style={{ color: "red" }}>{errors.age.message}</span>
          )}
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default App;
