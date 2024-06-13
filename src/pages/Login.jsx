import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { postMethod } from "@/utils/ApiMethods";
import { useState } from "react";
import { Link } from "react-router-dom";

export function LoginForm() {
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const onsSubmit = async () => {
    const res = await postMethod("/auth/login", { email: formData.email, password: formData.password });

    toast({
      variant: res.status === "error" || res.status === "fail" ? "destructive" : "success",
      title: res.message,
    });
    // console.log(res)
    if (res.status === "success") {
      localStorage.setItem("token", res.token);
      window.location.href = "/";
    }
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>Enter your email below to login to your account</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
              }}
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              {/* <Link href="#" className="ml-auto inline-block text-sm underline">
                Forgot your password?
              </Link> */}
            </div>
            <Input
              id="password"
              onChange={(e) => {
                setFormData({ ...formData, password: e.target.value });
              }}
              type="password"
              required
            />
          </div>
          <Button onClick={onsSubmit} type="submit" className="w-full">
            Login
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?
          <Link to="/register" className="underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
