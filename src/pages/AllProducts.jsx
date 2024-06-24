import { File, ListFilter, MoreHorizontal, PlusCircle } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sidebar } from "@/components/SideBar";
import { Each } from "@/utils/Each";
import { NavBar } from "@/components/NavBar";
import { useEffect, useState } from "react";
import { deleteMethod, getMethod, postMethod } from "@/utils/ApiMethods";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
export function AllProducts() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  //   const [pageData, setPageData] = useState({});
  //   const [status, setStatus] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    getMethod(`/products/vendor`, localStorage.getItem("token")).then((res) => {
      console.log(res.data.products);
      setProducts(res.data.products);
    });
  }, []);
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <NavBar></NavBar>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Tabs>
            <div className="flex items-center">
              <div className="ml-auto flex items-center gap-2">
                <Button
                  size="sm"
                  onClick={() => {
                    navigate("/products/add-product");
                  }}
                  className="h-7 gap-1"
                >
                  <PlusCircle className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Add Product</span>
                </Button>
              </div>
            </div>
            <TabsContent>
              <Card x-chunk="dashboard-06-chunk-0">
                <CardHeader>
                  <CardTitle>Products</CardTitle>
                  <CardDescription>Manage your products and view their sales performance.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="hidden w-[100px] sm:table-cell">
                          <span className="sr-only">Image</span>
                        </TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Sizes</TableHead>
                        <TableHead className="hidden md:table-cell">Category</TableHead>
                        <TableHead className="hidden md:table-cell">Created at</TableHead>
                        <TableHead>
                          <span className="sr-only">Actions</span>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {products.length != 0 && (
                        <Each
                          of={products}
                          render={(item, index) => {
                            return (
                              <TableRow>
                                <TableCell className="hidden sm:table-cell">
                                  <Carousel className="">
                                    <CarouselContent className="flex items-center">
                                      {
                                        <Each
                                          of={item.images}
                                          render={(item, index) => (
                                            <CarouselItem className="" key={index}>
                                              <img src={item} width={100} height={100} className=" object-cover" alt="" />
                                            </CarouselItem>
                                          )}
                                        ></Each>
                                      }
                                    </CarouselContent>
                                  </Carousel>
                                </TableCell>
                                <TableCell className="font-medium">{item.name}</TableCell>
                                <TableCell>
                                  <Badge variant="outline" className="capitalize">
                                    {item.status}
                                  </Badge>
                                </TableCell>
                                <TableCell className="font-medium">{item.price}</TableCell>
                                <TableCell>
                                  <Each
                                    of={item.sizes}
                                    render={(size, index) => (
                                      <Badge variant="outline" className="capitalize">
                                        {size.size}
                                      </Badge>
                                    )}
                                  ></Each>
                                </TableCell>
                                <TableCell className="hidden md:table-cell">
                                  <Badge>{item.category.name}</Badge>
                                </TableCell>
                                <TableCell className="hidden md:table-cell">{new Date(item.createdAt).toLocaleString("en-US")}</TableCell>
                                <TableCell>
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button aria-haspopup="true" size="icon" variant="ghost">
                                        <MoreHorizontal className="h-4 w-4" />
                                        <span className="sr-only">Toggle menu</span>
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                      <DropdownMenuItem
                                        onClick={() => {
                                          navigate(`/products/edit/${item._id}`);
                                        }}
                                      >
                                        Edit
                                      </DropdownMenuItem>
                                      <DropdownMenuItem
                                        onClick={() => {
                                          setIsOpen(true);
                                        }}
                                      >
                                        Delete
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </TableCell>
                                <DeleteProduct id={item._id} isOpen={isOpen} setIsOpen={setIsOpen} setProducts={setProducts}></DeleteProduct>
                              </TableRow>
                            );
                          }}
                        ></Each>
                      )}
                    </TableBody>
                  </Table>
                  {products.length == 0 && <p className="text-center my-6 text-2xl font-bold">No Products Found</p>}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}

const DeleteProduct = ({ id, isOpen, setIsOpen, setProducts }) => {
  const { toast } = useToast();
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(isOpen) => {
        setIsOpen(isOpen);
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Product</DialogTitle>
        </DialogHeader>
        <DialogContent>
          <DialogDescription>Are you sure you want to delete this product?</DialogDescription>
        </DialogContent>
        <DialogFooter>
          <Button
            onClick={() => {
              setIsOpen(false);
            }}
            variant="outline"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              deleteMethod(`/products/${id}`, localStorage.getItem("token")).then((res) => {
                if (res.status === "success") {
                  setIsOpen(false);

                  setProducts((prev) => prev.filter((item) => item._id !== id));
                  toast({
                    variant: "",
                    title: "Product deleted successfully!",
                  });
                } else if (res.status === "fail") {
                  toast({
                    variant: "destructive",
                    title: res.message,
                  });
                }
              });
            }}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
