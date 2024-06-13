import { ChevronLeft, PlusCircle, Trash, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

import { Sidebar } from "@/components/SideBar";
import { NavBar } from "@/components/NavBar";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { getMethod, postMethodMultipart, putMethodMultipart } from "@/utils/ApiMethods";
import { Each } from "@/utils/Each";
import { useToast } from "@/components/ui/use-toast";
import { set } from "date-fns";

export function AddProducts() {
  const navigate = useNavigate();
  const inputFile = useRef(null);
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [productPictures, setProductPictures] = useState([]);
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: 0,
    quantity: 0,
    sizes: [],
    category: "",
    images: [],
  });
  const [category, setCategory] = useState([]);

  const onSubmit = async () => {
    const form = new FormData();
    form.append("name", product.name);
    form.append("description", product.description);
    form.append("price", product.price);
    form.append("quantity", product.quantity);
    form.append("category", product.category);
    productPictures.forEach((pic) => {
      form.append("images", pic);
    });
    product.sizes.forEach((size, index) => {
      form.append(`sizes[${index}][size]`, size.size);
      form.append(`sizes[${index}][stock]`, size.stock);
      form.append(`sizes[${index}][price]`, size.price);
    });
    setLoading(true);

    toast({
      variant: "success",
      title: "Adding Product Please Wait...",
    });

    postMethodMultipart("/products", form, localStorage.getItem("token")).then((res) => {
      if(res.status === "success"){
        toast({
            variant: "success",
            title: "Product Added Successfully",
          });
        navigate("/products");
      }
      else{
        toast({
          variant: "error",
          title: "Product not added",
        });
        setLoading(false);
      }
    });
  };

  useEffect(() => {
    getMethod("/category").then((res) => {
      setCategory(res.data.categories);
    });
  }, []);
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Sidebar></Sidebar>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <NavBar />
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
            <div className="flex items-center gap-4">
              <Button
                onClick={() => {
                  navigate("/products");
                }}
                variant="outline"
                size="icon"
                className="h-7 w-7"
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
              </Button>
              <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">Add Product</h1>
              <div className="hidden items-center gap-2 md:ml-auto md:flex">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    navigate("/products");
                  }}
                >
                  Discard
                </Button>
                <Button disabled={loading} onClick={onSubmit} size="sm">
                  Add Product
                </Button>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
              <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                <Card x-chunk="dashboard-07-chunk-0">
                  <CardHeader>
                    <CardTitle>Product Details</CardTitle>
                    <CardDescription>Here you can add the product details.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6">
                      <div className="grid gap-3">
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          type="text"
                          className="w-full"
                          defaultValue={product.name}
                          onChange={(e) => {
                            setProduct({ ...product, name: e.target.value });
                          }}
                        />
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="price">Price</Label>
                        <Input
                          id="price"
                          type="number"
                          className="w-full"
                          defaultValue={product.price}
                          onChange={(e) => {
                            setProduct({ ...product, price: e.target.value });
                          }}
                        />
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="price">Quantity</Label>
                        <Input
                          id="price"
                          type="number"
                          className="w-full"
                          defaultValue={product.quantity}
                          onChange={(e) => {
                            setProduct({ ...product, quantity: e.target.value });
                          }}
                        />
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          defaultValue={product.description}
                          onChange={(e) => {
                            setProduct({ ...product, description: e.target.value });
                          }}
                          className="min-h-32 resize-none"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card x-chunk="dashboard-07-chunk-1">
                  <CardHeader>
                    <CardTitle>Stock</CardTitle>
                    <CardDescription>Here you can manage the stock and price of the product.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[100px]">Size</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <Each
                          of={product.sizes}
                          render={(size, index) => (
                            <TableRow>
                              <TableCell>
                                <ToggleGroup
                                  type="single"
                                  defaultValue={product.sizes[index].size}
                                  onValueChange={(e) => {
                                    let newProduct = product;
                                    newProduct.sizes[index].size = e;
                                    setProduct(newProduct);
                                  }}
                                  variant="outline"
                                >
                                  <ToggleGroupItem value="S">S</ToggleGroupItem>
                                  <ToggleGroupItem value="M">M</ToggleGroupItem>
                                  <ToggleGroupItem value="L">L</ToggleGroupItem>
                                  <ToggleGroupItem value="XL">XL</ToggleGroupItem>
                                  <ToggleGroupItem value="XXL">XXL</ToggleGroupItem>
                                </ToggleGroup>
                              </TableCell>
                              <TableCell>
                                <Trash
                                  onClick={() => {
                                    setProduct({ ...product, sizes: product.sizes.filter((_, i) => i !== index) });
                                  }}
                                  className="h-5 w-5 hover:text-destructive cursor-pointer"
                                ></Trash>
                              </TableCell>
                            </TableRow>
                          )}
                        ></Each>
                      </TableBody>
                    </Table>
                  </CardContent>
                  <CardFooter className="justify-center border-t p-4">
                    <Button
                      onClick={() => {
                        setProduct({ ...product, sizes: [...product.sizes, { size: "L", stock: 0, price: 0 }] });
                      }}
                      size="sm"
                      variant="ghost"
                      className="gap-1"
                    >
                      <PlusCircle className="h-3.5 w-3.5" />
                      Add Variant
                    </Button>
                  </CardFooter>
                </Card>
                <Card x-chunk="dashboard-07-chunk-2">
                  <CardHeader>
                    <CardTitle>Product Category</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6 sm:grid-cols-3">
                      <div className="grid gap-3">
                        <Label htmlFor="category">Category</Label>
                        <Select
                          value={product?.category}
                          onValueChange={(value) => {
                            setProduct({ ...product, category: value });
                          }}
                        >
                          <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Select Category</SelectLabel>
                              {<Each of={category} render={(item, index) => <SelectItem value={item._id}>{item.name}</SelectItem>}></Each>}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                <Card className="overflow-hidden" x-chunk="dashboard-07-chunk-4">
                  <CardHeader>
                    <CardTitle>Product Images</CardTitle>
                    <CardDescription>Here you can upload images for the product. The first image will be the main image.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-2">
                      <Each
                        of={productPictures}
                        render={(image, index) => (
                          <div className="relative">
                            <img alt="Product image" className="w-full rounded-md object-cover" height="84" src={URL.createObjectURL(image)} width="84" />
                            <div className="absolute top-0 left-0 w-full h-full bg-transparent">
                              <span
                                onClick={() => {
                                  setProductPictures((prevPictures) => prevPictures.filter((_, i) => i !== index));
                                }}
                                className="cursor-pointer  flex items-center justify-center rounded-lg transition-colors hover:text-destructive font-bold md:h-8 md:w-8 md:text-base"
                              >
                                <Trash className="h-5 w-5"></Trash>
                              </span>
                            </div>
                          </div>
                        )}
                      ></Each>

                      <div className="grid  gap-2">
                        <button
                          onClick={() => {
                            inputFile.current.click();
                          }}
                          className="flex aspect-square h-[75px] w-full items-center justify-center rounded-md border border-dashed"
                        >
                          <Upload className="h-4 w-4 text-muted-foreground" />
                          <Input
                            id="picture"
                            ref={inputFile}
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              if (e.target.files.length > 0) {
                                const newPictures = Array.from(e.target.files);
                                setProductPictures((prevPictures) => [...prevPictures, ...newPictures]);
                                e.target.value = "";
                              }
                            }}
                            type="file"
                          />
                          <span className="sr-only">Upload</span>
                        </button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 md:hidden">
              <Button
                onClick={() => {
                  navigate("/products");
                }}
                variant="outline"
                size="sm"
              >
                Discard
              </Button>
              <Button onClick={onSubmit} size="sm">
                Add Product
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
