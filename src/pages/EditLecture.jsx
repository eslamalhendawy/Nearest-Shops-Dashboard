// import Link from "next/link"
import { ChevronLeft, PlusCircle, Trash, Upload } from "lucide-react"

import { Badge } from "@/components/ui/badge"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Reorder } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

import { Sidebar } from "@/components/SideBar"
import { NavBar } from "@/components/NavBar"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import { getMethod, patchMethod, putMethod, putMethodMultipart } from "@/utils/ApiMethods"
import { Each } from "@/utils/Each"
import { useToast } from "@/components/ui/use-toast"
import { Show } from "@/utils/Show"

export function EditLecture() {
    const { id } = useParams()
    const navigate = useNavigate()

    const [loading, setLoading] = useState(false)

    const { toast } = useToast()
    const [lecture, setLecture] = useState({
        name: "",
        order: 0,
        videoLink: "",
        course: {
            _id: "",
        },
    })

    const onSubmit = () => {
        setLoading(true)

        toast({
            variant: "",
            title: "جاري تعديل المحاضرة",
        })
        patchMethod(
            `/lectures/${id}`,
            {
                name: lecture.name,
                order: lecture.order,
                videoLink: lecture.videoLink,
            },
            localStorage.getItem("token")
        ).then((res) => {
            toast({
                variant: res.status === "fail" || res.status === "error" ? "destructive" : "",
                title: res.status === "fail" || res.status === "error" ? res.message : "تم تعديل المحاضرة بنجاح",
            })
            navigate(`/course/details/${lecture.course._id}`)
        })
    }

    useEffect(() => {
        getMethod(`/lectures/admin/${id}`, localStorage.getItem("token")).then((res) => {
            
            setLecture({ ...res.data, order: 1 * res.data.order })
        })
    }, [])
    return (
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
            <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
                <NavBar></NavBar>
                <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                    <div className="mx-auto grid max-w-[59rem] w-full flex-1 auto-rows-max gap-4" style={{ direction: "rtl" }}>
                        <div className="flex items-center gap-4">
                            <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">تعديل محاضرة</h1>

                            <Button
                                onClick={() => {
                                    navigate(`/course/details/${lecture.course._id}`)
                                }}
                                variant="outline"
                                size="icon"
                                className="h-7 w-7"
                            >
                                <ChevronLeft className="h-4 w-4" />
                                <span className="sr-only">رجوع</span>
                            </Button>
                            <div className="hidden items-center gap-2 md:mr-auto md:flex">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                        navigate(`/course/details/${lecture.course._id}`)
                                    }}
                                >
                                    الغاء
                                </Button>
                                <Button disabled={loading} onClick={onSubmit} size="sm">
                                    حفظ
                                </Button>
                            </div>
                        </div>
                        <div className="grid">
                            <div className="grid auto-rows-max items-start gap-4 lg:col-span-3 lg:gap-8">
                                <Card x-chunk="dashboard-07-chunk-0">
                                    <CardHeader>
                                        <CardTitle>تفاصيل المحاضرة</CardTitle>
                                        <CardDescription>يمكنك هنا ادارة محتوى المحاضرة</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid gap-6">
                                            <div className="grid gap-3">
                                                <Label htmlFor="name">اسم المحاضرة</Label>
                                                <Input
                                                    id="name"
                                                    type="text"
                                                    className="w-full"
                                                    defaultValue={lecture.name}
                                                    onChange={(e) => {
                                                        setLecture({ ...lecture, name: e.target.value })
                                                    }}
                                                />
                                            </div>
                                            <div className="grid gap-3">
                                                <Label htmlFor="price">رقم المحاضرة</Label>
                                                <Input
                                                    id="price"
                                                    type="number"
                                                    className="w-full"
                                                    defaultValue={lecture.order}
                                                    value={lecture.order}
                                                    onChange={(e) => {
                                                        setLecture({ ...lecture, order: e.target.value })
                                                    }}
                                                />
                                            </div>
                                            <div className="grid gap-3">
                                                <Label htmlFor="videoLink">رابط الفيديو</Label>
                                                <Input
                                                    id="videoLink"
                                                    type="text"
                                                    className="w-full"
                                                    defaultValue={lecture.videoLink}
                                                    onChange={(e) => {
                                                        setLecture({ ...lecture, videoLink: e.target.value })
                                                    }}
                                                />
                                            </div>
                                            <Show>
                                                <Show.When
                                                    isTrue={lecture.videoLink ? true : false}
                                                    children={
                                                        <div className="grid gap-3">
                                                            <iframe
                                                                className="aspect-video w-full"
                                                                src={lecture.videoLink}
                                                                title="YouTube video player"
                                                                frameborder="0"
                                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                                allowfullscreen
                                                            ></iframe>
                                                        </div>
                                                    }
                                                ></Show.When>
                                                <Show.Else
                                                    children={
                                                        <div className="grid gap-3">
                                                            <div className="aspect-video w-full bg-muted-foreground">
                                                                <div className="flex items-center justify-center h-full">
                                                                    <p className=" text-xl font-semibold">لا يوجد فيديو</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    }
                                                ></Show.Else>
                                            </Show>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                        <div className="flex items-center justify-center gap-2 md:hidden">
                            <Button
                                onClick={() => {
                                    navigate("/products")
                                }}
                                variant="outline"
                                size="sm"
                            >
                                الغاء
                            </Button>
                            <Button onClick={onSubmit} size="sm">
                                حفظ
                            </Button>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}
