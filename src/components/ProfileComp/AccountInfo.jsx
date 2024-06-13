import PopupProfile from "@/components/PopupProfile";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useStore } from "@/context/storeContext";
import { putMethod } from "@/utils/ApiMethods";
import { Show } from "@/utils/Show";
import { ReloadIcon } from "@radix-ui/react-icons";

import { useState, useEffect } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";
import { Each } from "@/utils/Each";
export const AccountInfo = () => {
  const { toast } = useToast();
  const { state } = useStore();
  const [formData, setFormData] = useState(state);
  const [editFirst, setEditFirst] = useState(false);
  const [editLast, setEditLast] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    console.log(state);
    console.log(formData);
  }, [formData]);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };
  const onSubmit = async () => {
    setLoading(true);
    if (formData.firstName) {
      formData.name = formData.firstName + " " + formData.name.split(" ")[1];
      if (formData.lastName) {
        formData.name = formData.firstName + " " + formData.lastName;
      }
    }
    if (formData.lastName) {
      formData.name = formData.name.split(" ")[0] + " " + formData.lastName;
      if (formData.firstName) {
        formData.name = formData.firstName + " " + formData.lastName;
      }
    }

    putMethod("/users", formData, localStorage.getItem("token")).then((res) => {
      setLoading(false);
      setEditFirst(false);
      setEditLast(false);
      setFormData(res.data.user);
      toast({
        variant: res.status === "error" || res.status === "fail" ? "destructive" : "",
        title: "Profile updated",
      });
      console.log(res);
    });
  };

  return (
    <div className="grid gap-6">
      <Card x-chunk="dashboard-04-chunk-1">
        <CardHeader>
          <CardTitle>Information</CardTitle>
          <CardDescription>Update your personal information. This information will be displayed publicly.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="first-name">First name</Label>
              <Input
                id="first-name"
                disabled={!editFirst}
                defaultValue={formData.name.split(" ")[0]}
                onChange={(e) => {
                  setFormData({ ...formData, firstName: e.target.value });
                }}
                placeholder="Max"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="last-name">Last name</Label>
              <Input
                id="last-name"
                disabled={!editFirst}
                defaultValue={formData.name.split(" ")[1]}
                onChange={(e) => {
                  setFormData({ ...formData, lastName: e.target.value });
                }}
                placeholder="Robinson"
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              type="phone"
              disabled={!editFirst}
              maxLength="11"
              defaultValue={formData.phone}
              onChange={(e) => {
                setFormData({ ...formData, phone: e.target.value });
              }}
              placeholder="01xxxxxxxxx"
              required
            />
          </div>
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <Show>
            <Show.When isTrue={editFirst && !loading}>
              <div className="space-x-2">
                <Button onClick={onSubmit}>Save</Button>
                <Button
                  onClick={() => {
                    setEditFirst(false);
                    setEditLast(false);
                  }}
                  variant="destructive"
                >
                  Cancel
                </Button>
              </div>
            </Show.When>
            <Show.When isTrue={loading && editFirst}>
              <Button disabled>
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            </Show.When>
            <Show.Else>
              <Button
                onClick={() => {
                  setEditFirst(true);
                  setEditLast(false);
                }}
              >
                Edit
              </Button>
            </Show.Else>
          </Show>
        </CardFooter>
      </Card>
      <Card x-chunk="dashboard-04-chunk-2">
        <CardHeader>
          <CardTitle>Picture</CardTitle>
          <CardDescription>Update your profile picture.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative transition-all flex justify-center my-20">
            <PopupProfile items={state} handleClose={togglePopup} />
          </div>
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <Show>
            <Show.When isTrue={editLast && !loading}>
              <div className="space-x-2">
                <Button onClick={onSubmit}>Save</Button>
                <Button
                  onClick={() => {
                    setEditLast(false);
                    setEditFirst(false);
                  }}
                  variant="destructive"
                >
                  Cancel
                </Button>
              </div>
            </Show.When>
            <Show.When isTrue={loading && editLast}>
              <Button disabled>
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            </Show.When>
            <Show.Else>
              <Button
                onClick={() => {
                  setEditLast(true);
                  setEditFirst(false);
                }}
              >
                Edit
              </Button>
            </Show.Else>
          </Show>
        </CardFooter>
      </Card>
    </div>
  );
};
