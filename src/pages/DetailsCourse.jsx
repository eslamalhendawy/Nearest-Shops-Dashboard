import { NavBar } from "@/components/NavBar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { Subjects } from "@/data"
import { deleteMethod, getMethod } from "@/utils/ApiMethods"
import { Each } from "@/utils/Each"
import { MoreHorizontal, PlusCircle } from "lucide-react"
import React, { useEffect } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"

const DetailsCourse = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [course, setCourse] = React.useState({
        lectures: [],
        book: {
            title: "",
        },
    })
    const [isOpen, setIsOpen] = React.useState(false)

    useEffect(() => {
        console.log(id)
        getMethod(`/courses/${id}/teacher`, localStorage.getItem("token")).then((res) => {
            setCourse(res.data)
        })
    }, [])
    return (
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
            <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
                <NavBar></NavBar>
                <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 text-right">
                    <h1 className="text-3xl font-semibold">معلومات عن الكورس</h1>
                    <Tabs>
                        <div className="flex items-center">
                            <div className="mr-auto flex items-center gap-2">
                                <Button
                                    size="sm"
                                    onClick={() => {
                                        navigate(`/course/add-lectrue/${id}`)
                                    }}
                                    className="h-7 gap-1"
                                >
                                    <PlusCircle className="h-3.5 w-3.5" />
                                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">اضافة محاضرة</span>
                                </Button>
                            </div>
                        </div>
                        <TabsContent>
                            <Card x-chunk="dashboard-06-chunk-0 " className=" text-right">
                                <CardHeader>
                                    <CardTitle>كل المحاضرات</CardTitle>
                                    <CardDescription>هنا يمكنك اضافة وتعديل وحذف المحاضرات</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Table>
                                        <TableHeader>
                                            <TableRow className="text-right">
                                                {/* <TableHead className="hidden w-[100px] sm:table-cell">
                                                    <span className="sr-only">Image</span>
                                                </TableHead> */}

                                                {/* <TableHead>Sizes</TableHead>
                                                <TableHead className="hidden md:table-cell">Category</TableHead>
                                                <TableHead className="hidden md:table-cell">Created at</TableHead> */}

                                                <TableHead>
                                                    <span className="sr-only">Actions</span>
                                                </TableHead>

                                                <TableHead className="text-right">Subject</TableHead>

                                                <TableHead className="text-right">Name</TableHead>
                                                <TableHead className="text-right">Number</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {course && (
                                                <Each
                                                    of={course.lectures.sort((a, b) => a.order - b.order)}
                                                    render={(item, index) => {
                                                        return (
                                                            <TableRow className="text-right">
                                                                <TableCell className=" text-left">
                                                                    <DropdownMenu>
                                                                        <DropdownMenuTrigger asChild>
                                                                            <Button aria-haspopup="true" size="icon" variant="ghost">
                                                                                <MoreHorizontal className="h-4 w-4" />
                                                                                <span className="sr-only">Toggle menu</span>
                                                                            </Button>
                                                                        </DropdownMenuTrigger>
                                                                        <DropdownMenuContent align="end">
                                                                            <DropdownMenuLabel>الاجراءات</DropdownMenuLabel>
                                                                            <DropdownMenuItem
                                                                                onClick={() => {
                                                                                    navigate(`/products/edit/${item._id}`)
                                                                                }}
                                                                            >
                                                                                تعديل
                                                                            </DropdownMenuItem>
                                                                            <DropdownMenuItem
                                                                                onClick={() => {
                                                                                    setIsOpen(true)
                                                                                }}
                                                                            >
                                                                                حذف
                                                                            </DropdownMenuItem>
                                                                        </DropdownMenuContent>
                                                                    </DropdownMenu>
                                                                </TableCell>

                                                                <TableCell className="font-medium">
                                                                    <Link to={`/lecture/details/${item.id}`}>{item.name}</Link>
                                                                </TableCell>

                                                                <TableCell>
                                                                    <Link to={`/lecture/details/${item.id}`}>
                                                                        {" "}
                                                                        <Badge variant="outline" className="capitalize">
                                                                            {Subjects[`${course.subject}`]}
                                                                        </Badge>
                                                                    </Link>
                                                                </TableCell>
                                                                <TableCell className="font-medium">
                                                                    <Link to={`/lecture/details/${item.id}`}>{item.order}</Link>
                                                                </TableCell>

                                                                <DeleteLeacture
                                                                    id={item._id}
                                                                    isOpen={isOpen}
                                                                    setIsOpen={setIsOpen}
                                                                    setCourses={setCourse}
                                                                ></DeleteLeacture>
                                                            </TableRow>
                                                        )
                                                    }}
                                                ></Each>
                                            )}
                                        </TableBody>
                                    </Table>
                                    {/* {courses.length == 0 && <p className="text-center my-6 text-2xl font-bold">No Products Found</p>} */}
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                    <h1 className="text-3xl font-semibold">كتاب الكورس</h1>
                    <Card x-chunk="dashboard-06-chunk-0 " className=" text-right">
                        <CardHeader>
                            <CardTitle>الاسم : {course.book.title}</CardTitle>
                            {/* <CardDescription>هنا يمكنك اضافة وتعديل وحذف كتاب الكورس</CardDescription> */}
                        </CardHeader>
                        <CardContent className="flex flex-col items-end">
                            <img src={course.book.imageURL} alt="book" className="w-1/4" />

                            <div className="flex justify-between w-full">
                                <Button>تعديل</Button>
                                <div className="space-x-2">
                                    <Button>تحميل الكتاب</Button>
                                    <Button variant="outline">عرض الكتاب</Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </main>
            </div>
        </div>
    )
}

export default DetailsCourse

const DeleteLeacture = ({ id, isOpen, setIsOpen, setCourses }) => {
    const { toast } = useToast()
    return (
        <Dialog
            open={isOpen}
            onOpenChange={(isOpen) => {
                setIsOpen(isOpen)
            }}
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>حذف المحاضرة</DialogTitle>
                </DialogHeader>
                <DialogContent>
                    <DialogDescription>هل انت متأكد من حذف المحاضرة؟ لا يمكن التراجع عن هذا القرار</DialogDescription>
                </DialogContent>
                <DialogFooter>
                    <Button
                        onClick={() => {
                            setIsOpen(false)
                        }}
                        variant="outline"
                    >
                        الغاء
                    </Button>
                    <Button
                        onClick={() => {
                            deleteMethod(`/lectures/${id}`, localStorage.getItem("token")).then((res) => {
                                if (res.status === "success" || res.status === "Success") {
                                    setIsOpen(false)
                                    setCourses((prev) => prev.filter((item) => item._id !== id))
                                    toast({
                                        variant: "",
                                        title: "تم حذف المحاضرة بنجاح",
                                    })
                                } else if (res.status === "fail") {
                                    toast({
                                        variant: "destructive",
                                        title: res.message,
                                    })
                                }
                            })
                        }}
                    >
                        حذف
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
