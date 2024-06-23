import { ChevronLeft, CornerRightUpIcon, DeleteIcon, MinusIcon, PlusCircle, PlusIcon, ReplyIcon, Trash, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
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
import { deleteMethod, getMethod, patchMethod, postMethod, postMethodMultipart, putMethodMultipart } from "@/utils/ApiMethods"
import { Each } from "@/utils/Each"
import { useToast } from "@/components/ui/use-toast"
import { set } from "date-fns"
import { Show } from "@/utils/Show"
import { useStore } from "@/context/storeContext"

export function DetailsLectrue() {
    const navigate = useNavigate()
    const { state } = useStore()
    const { id } = useParams()
    const { toast } = useToast()
    const [loading, setLoading] = useState(false)
    const [lecture, setLecture] = useState({
        name: "",
        order: 0,
        videoLink: "",
        comments: [],
    })
    useEffect(() => {
        getMethod(`/lectures/admin/${id}`, localStorage.getItem("token")).then((res) => {
            console.log(res.data)
            setLecture({ ...res.data, order: 1 * res.data.order })
        })
    }, [])
    return (
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
            <Sidebar></Sidebar>
            <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
                <NavBar />
                <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                    <div className="mx-auto grid max-w-[59rem] w-full flex-1 auto-rows-max gap-4" style={{ direction: "rtl" }}>
                        <div className="flex items-center gap-4">
                            <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">محتوى محاضرة</h1>

                            <div className="hidden items-center gap-2 md:mr-auto md:flex">
                                <Button
                                    onClick={() => {
                                        navigate(`/course/details/${lecture.course.id}`)
                                    }}
                                    variant="outline"
                                    size="icon"
                                    className="h-7 w-7"
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                    <span className="sr-only">رجوع</span>
                                </Button>
                            </div>
                        </div>
                        <div className="grid">
                            <div className="grid auto-rows-max items-start gap-4 lg:col-span-3 lg:gap-8">
                                <Card x-chunk="dashboard-07-chunk-0">
                                    <CardHeader>
                                        <CardTitle>{lecture.name}</CardTitle>
                                        <CardDescription>
                                            <span>الترتيب: {lecture.order}</span>
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="font-semibold  mb-2">الفيديو: </p>

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

                                        <p className="font-semibold  my-2">التعليقات: </p>
                                        <Show>
                                            <Show.When
                                                isTrue={lecture.comments.length > 0}
                                                children={
                                                    <Each
                                                        // filter by the most likes
                                                        of={lecture.comments.sort((a, b) => b.totalScore - a.totalScore)}
                                                        render={(item, index) => (
                                                            // comments and reply
                                                            <div className="w-full  rounded-3xl ">
                                                                <div
                                                                    className="w-full flex gap-2 flex-row justify-between p-6 rounded-3xl mt-7"
                                                                    style={{
                                                                        boxShadow: `0px 0px 10px 0px rgba(255,255,255,0.1)`,
                                                                    }}
                                                                >
                                                                    <div className="w-full">
                                                                        <div className="flex  justify-between ">
                                                                            <div className="flex flex-row gap-2 items-center ">
                                                                                <img
                                                                                    src={
                                                                                        item.teacher?.photo
                                                                                            ? item.teacher.photo
                                                                                            : item.student?.photo
                                                                                            ? item.student.photo
                                                                                            : "https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png?f=webp&w=256"
                                                                                    }
                                                                                    width={36}
                                                                                    height={36}
                                                                                    alt="Avatar"
                                                                                    className="overflow-hidden rounded-full w-10 h-10 ml-2"
                                                                                />

                                                                                <p className=" font-bold">
                                                                                    {item.teacher
                                                                                        ? item.teacher.Fname + " " + item.teacher.Lname
                                                                                        : item.student
                                                                                        ? item.student.Fname + " " + item.student.Lname
                                                                                        : "Ahmed Mohesn"}
                                                                                </p>
                                                                            </div>
                                                                            <div className="flex justify-start gap-3">
                                                                                <Button
                                                                                    variant="destructive"
                                                                                    className="flex items-center w-fit p-0 px-2"
                                                                                    onClick={() => {
                                                                                        deleteMethod(
                                                                                            `/lectures/${id}/comments/teacher/${item.id}`,
                                                                                            localStorage.getItem("token")
                                                                                        ).then((res) => {
                                                                                            console.log(res)
                                                                                            setLecture({
                                                                                                ...lecture,
                                                                                                comments: lecture.comments.filter(
                                                                                                    (i) => i.id !== item.id
                                                                                                ),
                                                                                            })
                                                                                        })
                                                                                    }}
                                                                                >
                                                                                    <DeleteIcon size={16}></DeleteIcon>
                                                                                    حذف
                                                                                </Button>
                                                                                {/* <Button
                                                                                    variant="outline"
                                                                                    className="flex items-center w-fit p-0 px-2"
                                                                                    onClick={() => {
                                                                                        setIsReply({ reply: true, id: item.id })
                                                                                    }}
                                                                                >
                                                                                    <ReplyIcon size={16}></ReplyIcon>
                                                                                    رد
                                                                                </Button> */}
                                                                            </div>
                                                                        </div>
                                                                        <p className=" pr-10">{item.text}</p>
                                                                    </div>
                                                                    {/* <div className="flex flex-col items-center bg-[#F5F6FA] p-2 rounded-lg h-fit  gap-2">
                                                                        <PlusIcon
                                                                            size={18}
                                                                            className={`text-[#3A5A40] ${
                                                                                !item.likes.includes(state._id)
                                                                                    ? "hover:text-blue-500 transition-all cursor-pointer"
                                                                                    : ""
                                                                            } `}
                                                                            onClick={() => {
                                                                                if (!item.likes.includes(state._id)) {
                                                                                    patchMethod(
                                                                                        `/lectures/${lecture.id}/comments/like/${item.id}`,
                                                                                        {},
                                                                                        localStorage.getItem("token")
                                                                                    ).then((res) => {
                                                                                        console.log(res);
                                                                                        setLecture({
                                                                                            ...lecture,
                                                                                            comments: lecture.comments.map((i) =>
                                                                                                i.id === item.id ? res.data : i
                                                                                            ),
                                                                                        })
                                                                                    })
                                                                                }
                                                                            }}
                                                                        />
                                                                        <p className="text-primary">{item.totalScore}</p>
                                                                        <MinusIcon
                                                                            size={18}
                                                                            className={`text-[#3A5A40]  ${
                                                                                !item.disLikes.includes(state._id)
                                                                                    ? "hover:text-red-500 transition-all cursor-pointer"
                                                                                    : ""
                                                                            } `}
                                                                            onClick={() => {
                                                                                if (!item.disLikes.includes(state._id)) {
                                                                                    patchMethod(
                                                                                        `/lectures/${lecture.id}/comments/dislike/${item.id}`,
                                                                                        {},
                                                                                        localStorage.getItem("token")
                                                                                    ).then((res) => {
                                                                                        setLecture({
                                                                                            ...lecture,
                                                                                            comments: lecture.comments.map((i) =>
                                                                                                i.id === item.id ? res.data : i
                                                                                            ),
                                                                                        })
                                                                                    })
                                                                                }
                                                                            }}
                                                                        />
                                                                    </div> */}
                                                                </div>
                                                                <div className={`flex flex-col    ${item.replies?.length === 0 ? " hidden" : ""}`}>
                                                                    <Each
                                                                        of={item.replies}
                                                                        render={(item, index) => (
                                                                            <div className="flex items-center  ">
                                                                                <CornerRightUpIcon size={40} />
                                                                                <div
                                                                                    className="w-[98%] flex gap-2 flex-row justify-between p-6 rounded-3xl mt-7"
                                                                                    style={{
                                                                                        boxShadow: `0px 0px 10px 0px rgba(255,255,255,0.1)`,
                                                                                    }}
                                                                                >
                                                                                    <div className="w-full">
                                                                                        <div className="flex flex-row justify-between ">
                                                                                            <div className="flex  gap-2 flex-row items-center ">
                                                                                                <img
                                                                                                    src={
                                                                                                        item.teacher?.photo
                                                                                                            ? item.teacher.photo
                                                                                                            : item.student?.photo
                                                                                                            ? item.student.photo
                                                                                                            : "https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png?f=webp&w=256x"
                                                                                                    }
                                                                                                    width={36}
                                                                                                    height={36}
                                                                                                    alt="Avatar"
                                                                                                    className="overflow-hidden rounded-full w-10 h-10 ml-2"
                                                                                                />

                                                                                                <p className=" font-bold">
                                                                                                    {item.teacher
                                                                                                        ? item.teacher.Fname +
                                                                                                          " " +
                                                                                                          item.teacher.Lname
                                                                                                        : item.student
                                                                                                        ? item.student.Fname +
                                                                                                          " " +
                                                                                                          item.student.Lname
                                                                                                        : "Ahmed Mohesn"}
                                                                                                </p>
                                                                                            </div>
                                                                                            <div className="flex justify-start gap-3">
                                                                                                <Button
                                                                                                    variant="destructive"
                                                                                                    className="flex items-center w-fit p-0 px-2"
                                                                                                    onClick={() => {
                                                                                                        deleteMethod(
                                                                                                            `/lectures/${id}/comments/teacher/${item.id}`,
                                                                                                            localStorage.getItem("token")
                                                                                                        ).then((res) => {
                                                                                                            // replies
                                                                                                            setLecture({
                                                                                                                ...lecture,
                                                                                                                comments: lecture.comments.map(
                                                                                                                    (i) => {
                                                                                                                        if (i.replies) {
                                                                                                                            return {
                                                                                                                                ...i,
                                                                                                                                replies:
                                                                                                                                    i.replies.filter(
                                                                                                                                        (i) =>
                                                                                                                                            i.id !==
                                                                                                                                            item.id
                                                                                                                                    ),
                                                                                                                            }
                                                                                                                        }
                                                                                                                        return i
                                                                                                                    }
                                                                                                                ),
                                                                                                            })
                                                                                                        })
                                                                                                    }}
                                                                                                >
                                                                                                    <DeleteIcon size={16}></DeleteIcon>
                                                                                                    حذف
                                                                                                </Button>
                                                                                                {/* <Button
                                                                                                    variant="outline"
                                                                                                    className="flex items-center w-fit p-0 px-2"
                                                                                                    onClick={() => {
                                                                                                        setIsReply({ reply: true, id: item.id })
                                                                                                    }}
                                                                                                >
                                                                                                    <ReplyIcon size={16}></ReplyIcon>
                                                                                                    رد
                                                                                                </Button> */}
                                                                                            </div>
                                                                                        </div>
                                                                                        <p className=" pr-10">{item.text}</p>
                                                                                    </div>
                                                                                    {/* <div className="flex flex-col items-center bg-[#F5F6FA] p-2 rounded-lg h-fit  gap-2">
                                                                                        <PlusIcon
                                                                                            size={18}
                                                                                            className="text-[#3A5A40] hover:text-primary/20 transition-all cursor-pointer"
                                                                                            onClick={() => {
                                                                                                patchMethod(
                                                                                                    `/lectures/${data.id}/comments/like/${item.id}`,
                                                                                                    {},
                                                                                                    localStorage.getItem("token")
                                                                                                ).then((res) => {
                                                                                                    setData({
                                                                                                        ...data,
                                                                                                        comments: data.comments.map((i) =>
                                                                                                            i.id === item.id ? res.data : i
                                                                                                        ),
                                                                                                    })
                                                                                                })
                                                                                            }}
                                                                                        />
                                                                                        <p className="text-primary">{item.totalScore}</p>
                                                                                        <MinusIcon
                                                                                            size={18}
                                                                                            className="text-[#3A5A40]  hover:text-red-500 transition-all cursor-pointer"
                                                                                            onClick={() => {
                                                                                                patchMethod(
                                                                                                    `/lectures/${data.id}/comments/dislike/${item.id}`,
                                                                                                    {},
                                                                                                    localStorage.getItem("token")
                                                                                                ).then((res) => {
                                                                                                    setData({
                                                                                                        ...data,
                                                                                                        comments: data.comments.map((i) =>
                                                                                                            i.id === item.id ? res.data : i
                                                                                                        ),
                                                                                                    })
                                                                                                })
                                                                                            }}
                                                                                        />
                                                                                    </div> */}
                                                                                </div>
                                                                            </div>
                                                                        )}
                                                                    ></Each>
                                                                </div>
                                                            </div>
                                                        )}
                                                    ></Each>
                                                }
                                            ></Show.When>
                                            <Show.Else
                                                children={
                                                    <div className="grid gap-3">
                                                        <div className="flex items-center justify-center h-full">
                                                            <p className=" text-xl font-semibold">لا يوجد تعليقات</p>
                                                        </div>
                                                    </div>
                                                }
                                            ></Show.Else>
                                        </Show>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}
