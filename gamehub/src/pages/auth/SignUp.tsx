import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "@/components/ui/toast";
import { API_BASE_KEY } from "@/lib/constants";
import {
  SignUpSchema,
  type AuthFormFieldProps,
  type SignUpType,
} from "@/validations/authValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { User } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";

const FormField: React.FC<AuthFormFieldProps> = ({
  errors,
  id,
  register,
  maxLength,
  label,
  type = "text",
  placeholder,
}) => {
  return (
    <Field>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <Input
        className="h-10"
        placeholder={placeholder}
        type={type}
        id={id}
        maxLength={maxLength}
        {...register(id)}
      />
      {errors[id] && <FieldError>{errors[id].message}</FieldError>}
    </Field>
  );
};

const SignUp = () => {
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
    trigger,
  } = useForm({
    resolver: zodResolver(SignUpSchema),
    mode: "onChange",
  });
  const createUser = async (data: SignUpType) => {
    const response = await axios.post(`${API_BASE_KEY}/auth/signup`, {
      username: data.username,
      email: data.email,
      password: data.password,
    });
    return response.data;
  };
  const { mutate, isPending, data, isSuccess } = useMutation({
    mutationKey: ["auth"],
    mutationFn: createUser,
    onSuccess() {
      navigate("/login");
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.add({ title: error.response?.data.detail });
      } else {
        toast.add({ title: "Error occured" });
      }
    },
  });
  const onSubmit = async (data: SignUpType) => {
    const isValid = await trigger();
    if (!isValid) return;
    mutate(data);
  };

  if (isSuccess) {
    toast.add({ title: data.message });
  }
  return (
    <div className="my-5 flex items-center justify-center">
      <div className="flex items-center justify-center flex-col w-1/2 gap-4">
        <div className="flex items-center flex-col gap-2 mb-4">
          <span className="p-2 flex w-fit rounded-md bg-accent">
            <User className="text-primary font-bold" />
          </span>
          <h1 className="font-medium text-xl">Login to your account</h1>
          <p className="text-xs text-muted-foreground tracking-wide">
            Enter your email address and password to login and explore
          </p>
        </div>
        <form className="w-full max-w-md space-y-4">
          <FieldGroup>
            <FieldSet>
              <FormField
                errors={errors}
                register={register}
                id="username"
                label="Username"
                placeholder="The Gamer"
              />
              <FormField
                errors={errors}
                register={register}
                id="email"
                label="Email"
                type="email"
                placeholder="eg.gamehub@game.com"
              />
              <FieldGroup>
                <FormField
                  errors={errors}
                  register={register}
                  id="password"
                  type="password"
                  label="Password"
                  placeholder="**************"
                />
                <FormField
                  errors={errors}
                  register={register}
                  id="confirmPassword"
                  type="password"
                  label="Confirm Password"
                  placeholder="**************"
                />
              </FieldGroup>
            </FieldSet>
          </FieldGroup>

          <Link
            to="/forgot-password"
            className="flex justify-end font-normal text-purple-600 hover:text-purple-400 duration-200 text-sm"
          >
            Forgot Password
          </Link>
          <Button
            type="submit"
            className="w-full"
            size="lg"
            onClick={handleSubmit(onSubmit)}
          >
            {isPending ? (
              <>
                <Spinner />
                Registering....
              </>
            ) : (
              "Signup"
            )}
          </Button>
        </form>
        <div className="text-center tracking-wide text-sm">
          <p>
            Already have an account{" "}
            <Link to="/login" className="text-purple-600  font-medium">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
