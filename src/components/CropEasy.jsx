// import { Cancel } from "@mui/icons-material"
// import CropIcon from "@mui/icons-material/Crop"
import { Box, CircularProgress, DialogActions, DialogContent } from "@mui/material"
import React, { useState } from "react"
import Cropper from "react-easy-crop"
import getCroppedImg from "@/utils/cropImage"
import { CropIcon, ExitIcon } from "@radix-ui/react-icons"
import { Button } from "./ui/button"
import { Slider } from "./ui/slider"
import { Label } from "./ui/label"
import { putMethodMultipart } from "@/utils/ApiMethods"
import { useStore } from "@/context/storeContext"
import { LoaderIcon } from "lucide-react"

const CropEasy = ({ photoURL, setOpenCrop, setPhotoURL, setFile }) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)
    const [rotation, setRotation] = useState(0)
    const [IsReload, setIsReload] = useState(false)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)

    const cropComplete = (croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels)
    }
    const { setState } = useStore()

    const cropImage = async () => {
        setIsReload(true)
        try {
            const { file, url } = await getCroppedImg(photoURL, croppedAreaPixels, rotation)
            const formData = new FormData()

            formData.append("photo", file)
            putMethodMultipart("/users", formData, localStorage.getItem("token")).then((res) => {
                setIsReload(false)
                setOpenCrop(false)
                // useState
                setState(res.data.user)
                window.location.reload()
            })
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <DialogContent
                dividers
                sx={{
                    background: "#333",
                    position: "relative",
                    height: 400,
                    width: "auto",
                    minWidth: { sm: 500 },
                }}
            >
                <Cropper
                    image={photoURL}
                    crop={crop}
                    zoom={zoom}
                    rotation={rotation}
                    aspect={1}
                    onZoomChange={setZoom}
                    onRotationChange={setRotation}
                    onCropChange={setCrop}
                    onCropComplete={cropComplete}
                />
            </DialogContent>
            <DialogActions sx={{ flexDirection: "column", mx: 3, my: 2 }}>
                {!IsReload && (
                    <div>
                        <Box sx={{ width: "100%", mb: 1 }}>
                            <div className="space-y-2">
                                <Label>Zoom: {zoomPercent(zoom)}</Label>
                                <Slider
                                    defaultValue={[zoom]}
                                    value={[zoom]}
                                    min={1}
                                    max={3}
                                    step={0.1}
                                    onValueChange={(e) => {
                                        setZoom(e)
                                    }}
                                ></Slider>
                            </div>
                            <div className="space-y-2 mt-2">
                                <Label>Rotation: {rotation + "°"}</Label>

                                <Slider
                                    defaultValue={[rotation]}
                                    value={[rotation]}
                                    min={0}
                                    max={360}
                                    onValueChange={(e) => {
                                        setRotation(e)
                                    }}
                                ></Slider>
                            </div>
                        </Box>
                        <div
                            sx={{
                                display: "flex",
                                gap: 2,
                                flexWrap: "wrap",
                            }}
                            className="mt-4 space-x-2"
                        >
                            <Button variant="destructive" onClick={() => setOpenCrop(false)}>
                                <ExitIcon /> Discard
                            </Button>
                            <Button onClick={cropImage}>
                                <CropIcon /> Change
                            </Button>
                        </div>
                    </div>
                )}
                {IsReload && <LoaderIcon size={48} className="mt-14 animate-spin  transition-all duration-1000 text-primary"></LoaderIcon>}
            </DialogActions>
        </>
    )
}

export default CropEasy

const zoomPercent = (value) => {
    return `${Math.round(value * 100)}%`
}
