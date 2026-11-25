import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "@/components/ui/toast";
import { API_BASE_KEY } from "@/lib/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Link, useNavigate } from "react-router";
import { LogIn } from "lucide-react";

const Login = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const login = async (data: { email: string; password: string }) => {
    const response = await axios.post(`${API_BASE_KEY}/auth/login`, data, {
      withCredentials: true,
    });
    return response;
  };
  const { mutate, isPending } = useMutation({
    mutationKey: ["login"],
    mutationFn: login,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["is_auth_user"],
      });
      navigate("/");
    },
    onError(error) {
      if (axios.isAxiosError(error)) {
        toast.add({ type: "error", title: error.response?.data.detail });
      } else {
        toast.add({ title: "Error occured", type: "error" });
      }
    },
  });
  const handleSubmit = (data: FormData) => {
    const email = data.get("email") as string;
    const password = data.get("password") as string;
    mutate({ email, password });
  };
  return (
    <div className="flex items-center justify-center my-5">
      <div className="flex items-center justify-center flex-col w-1/2 gap-4">
        <div className="flex items-center flex-col gap-2 mb-6">
          <span className="p-2 flex w-fit rounded-md bg-accent">
            <LogIn className="text-primary font-bold" />
          </span>
          <h1 className="font-medium text-xl">Login to your account</h1>
          <p className="text-xs text-muted-foreground tracking-wide">
            Enter your email address and password to login and explore
          </p>
        </div>
        <form className="w-full max-w-md space-y-4" action={handleSubmit}>
          <FieldGroup>
            <FieldSet>
              <Field>
                <FieldLabel className="text-muted-foreground" htmlFor="email">
                  Email
                </FieldLabel>
                <Input
                  placeholder="eg.gamehub@game.com"
                  className="h-10"
                  name="email"
                  required
                  type="email"
                />
              </Field>
              <Field>
                <FieldLabel
                  className="text-muted-foreground"
                  htmlFor="password"
                >
                  Password
                </FieldLabel>
                <Input
                  className="h-10"
                  type="password"
                  name="password"
                  placeholder="*****************************"
                  required
                  autoComplete="new-password"
                />
              </Field>
            </FieldSet>
          </FieldGroup>

          <Link
            to="/forgot-password"
            className="flex justify-end font-normal text-purple-600 hover:text-purple-400 duration-200 text-sm"
          >
            Forgot Password
          </Link>
          <Button type="submit" className="w-full" size="lg">
            {isPending ? (
              <>
                <Spinner />
                Logging....
              </>
            ) : (
              "Login"
            )}
          </Button>
        </form>
        <div className="text-center tracking-wide text-sm">
          <p>
            Don't ahve an account{" "}
            <Link to="/signup" className="text-purple-600  font-medium">
              Singup
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
