import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(5),
});

type LoginValues = z.infer<typeof loginSchema>;

const useFormLogin = () => {
  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (values: LoginValues) => {
    console.log(values);
  };

  return { form, onSubmit };
};

export default useFormLogin;
