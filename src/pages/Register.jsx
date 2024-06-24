import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { postMethod } from "@/utils/ApiMethods";
import { Each } from "@/utils/Each";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [government, setGovernment] = useState("");
  const [address, setAddress] = useState("");
  const role = "vendor";
  const { toast } = useToast();
  const navigate = useNavigate();

  const regNumbers = /^[0-9]+$/;
  const regEmail = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;

  const handleSubmit = async () => {
    if (!name || !email || !password || !confirmPassword || !phone || !government) {
      toast({
        variant: "destructive",
        title: "Please fill all fields",
      });
      return;
    }
    if (!email.match(regEmail)) {
      toast({
        variant: "destructive",
        title: "Invalid email",
      });
      return;
    }
    if (password.length < 8) {
      toast({
        variant: "destructive",
        title: "Password should be at least 8 characters",
      });
      return;
    }
    if (password !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "Passwords do not match",
      });
      return;
    }
    if (!phone.match(regNumbers)) {
      toast({
        variant: "destructive",
        title: "Phone number should contain only numbers",
      });
      return;
    }
    if (phone.length !== 11) {
      toast({
        variant: "destructive",
        title: "Phone number should be 11 digits",
      });
      return;
    }
    if (password !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "Passwords do not match",
      });
      return;
    }
    const res = await postMethod("/auth/register", {
      name,
      email,
      password,
      phone,
      passwordConfirm: confirmPassword,
      government,
      address,
      role,
    });
    console.log(res);
    if (res.status === "success") {
      toast({
        variant: "success",
        title: "Account created successfully",
      });
      localStorage.setItem("token", res.token);
      navigate("/");
    } else {
      toast({
        variant: "destructive",
        title: res.message,
      });
    }
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Sign Up</CardTitle>
        <CardDescription>Enter your information to create an account</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input id="first-name" onChange={(e) => setName(e.target.value)} placeholder="Enter your name" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input id="confirmPassword" type="password" onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm your password" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" type="tel" onChange={(e) => setPhone(e.target.value)} placeholder="Enter your phone number" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="phone">Address</Label>
            <Input id="address" type="tel" onChange={(e) => setAddress(e.target.value)} placeholder="Enter your Address" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="gender">Government</Label>
            <Select
              defaultValue={""}
              onValueChange={(value) => {
                setGovernment(value);
              }}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Government" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Government</SelectLabel>
                  {
                    <Each
                      of={["الإسكندرية", "الإسماعيلية", "أسوان", "أسيوط", "الأقصر", "البحيرة", "البحر الأحمر", "الجيزة", "الدقهلية", "السويس", "الشرقية", "الغربية", "الفيوم", "القاهرة", "القليوبية", "المنوفية", "المنيا", "الوادي الجديد", "بني سويف", "بورسعيد", "جنوب سيناء", "دمياط", "سوهاج", "شمال سيناء", "قنا", "كفر الشيخ", "مطروح"]}
                      render={(item, index) => (
                        <SelectItem value={item} className="capitalize">
                          {item}
                        </SelectItem>
                      )}
                    ></Each>
                  }
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" onClick={handleSubmit} className="w-full">
            Create an account
          </Button>
        </div>
        <div className="mt-4 text-center text-sm flex justify-center gap-4">
          <span>Already have an account?</span>
          <Link to="/login" className="underline">
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
