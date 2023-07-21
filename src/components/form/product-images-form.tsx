// import {
//   Dispatch,
//   HTMLAttributes,
//   SetStateAction,
//   useCallback,
//   useEffect,
//   useRef,
//   useState,
// } from "react";
// import Image from "next/image";
// import type { FileWithPreview } from "@/types";
// import Cropper, { type ReactCropperElement } from "react-cropper";
// import {
//   useDropzone,
//   type Accept,
//   type FileRejection,
//   type FileWithPath,
// } from "react-dropzone";
// import type {
//   FieldValues,
//   Path,
//   PathValue,
//   UseFormSetValue,
// } from "react-hook-form";

// import "cropperjs/dist/cropper.css";

// import { cn, formatBytes } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
// import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
// import { Icons } from "@/components/icons";
// import { toast } from "@/components/ui/use-toast";
// import { AspectRatio } from "@/components/ui/aspect-ratio";
// import { productImageFileMax } from "@/config/product";

// interface ProductImagesFormProps<TFieldValues extends FieldValues>
//   extends HTMLAttributes<HTMLDivElement> {
//   name: Path<TFieldValues>;
//   setValue: UseFormSetValue<TFieldValues>;
//   accept?: Accept;
//   maxSize?: number;
//   maxFiles?: number;
//   files: FileWithPreview[];
//   setFiles: Dispatch<SetStateAction<FileWithPreview[]>>;
//   isUploading?: boolean;
//   disabled?: boolean;
// }

// export function ProductImagesForm<TFieldValues extends FieldValues>({
//   name,
//   setValue,
//   accept = {
//     "image/*": [],
//   },
//   maxSize = 1024 * 1024 * 2,
//   maxFiles = 1,
//   files,
//   setFiles,
//   isUploading = false,
//   disabled = false,
//   className,
//   ...props
// }: ProductImagesFormProps<TFieldValues>) {
//   const onDrop = useCallback(
//     (acceptedFiles: FileWithPath[], rejectedFiles: FileRejection[]) => {
//       setValue(
//         name,
//         acceptedFiles as PathValue<TFieldValues, Path<TFieldValues>>,
//         {
//           shouldValidate: true,
//         }
//       );

//       console.log("acceptedFiles: ", acceptedFiles);

//       acceptedFiles.forEach((file) => {
//         setFiles((preFiles) => [
//           ...preFiles,
//           Object.assign(file, {
//             preview: URL.createObjectURL(file),
//           }),
//         ]);
//       });

//       if (rejectedFiles.length > 0) {
//         rejectedFiles.forEach(({ errors }) => {
//           if (errors[0]?.code === "file-too-large") {
//             toast({
//               description: `File is too large. Max size is ${formatBytes(
//                 maxSize
//               )}`,
//               variant: "destructive",
//             });
//             return;
//           }
//           errors[0]?.message &&
//             toast({ description: errors[0].message, variant: "destructive" });
//         });
//       }
//     },

//     [maxSize, name, setFiles, setValue]
//   );

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     onDrop,
//     accept,
//     maxSize,
//     maxFiles,
//     multiple: maxFiles > 1, // maxFiles > 1
//     disabled,
//   });

//   // Revoke preview url when component unmounts
//   useEffect(() => {
//     return () => {
//       if (!files) return;
//       files.forEach((file) => URL.revokeObjectURL(file.preview));
//     };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   let placeHolderImages = productImageFileMax - files.length - 1;

//   return (
//     <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
//       {files
//         ? files.map((file, index) => (
//             <ProductImageFileCard
//               key={index}
//               i={index}
//               file={file}
//               name={name}
//               setValue={setValue}
//               files={files}
//               setFiles={setFiles}
//             />
//           ))
//         : null}
//       {placeHolderImages >= 0 ? (
//         <AspectRatio ratio={4 / 3}>
//           <div
//             {...getRootProps()}
//             className={cn(
//               "group relative grid h-full w-full cursor-pointer place-items-center rounded-lg border-2 border-dashed border-muted-foreground/25 text-center transition hover:bg-muted/50",
//               "ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
//               isDragActive && "border-muted-foreground/50",
//               disabled && "pointer-events-none opacity-60",
//               className
//             )}
//             {...props}
//           >
//             <input {...getInputProps()} />
//             <div className="flex flex-col gap-2 md:gap-8 items-center text-muted-foreground">
//               <Icons.imagePlus className="w-10 h-10" />
//               <p>Add a photo</p>
//             </div>
//           </div>
//         </AspectRatio>
//       ) : null}
//       {Array.from({ length: placeHolderImages }, (_, i) => i).map((index) => (
//         <AspectRatio ratio={4 / 3} key={index}>
//           <div className="w-full h-full bg-muted flex justify-center items-center rounded-lg">
//             <div>
//               <Icons.imageOff className="w-10 h-10 text-muted-foreground" />
//             </div>
//           </div>
//         </AspectRatio>
//       ))}
//     </div>
//   );
// }

// interface ProductImageFileCardProps<TFieldValues extends FieldValues> {
//   i: number;
//   file: FileWithPreview;
//   name: Path<TFieldValues>;
//   setValue: UseFormSetValue<TFieldValues>;
//   files: FileWithPreview[];
//   setFiles: Dispatch<SetStateAction<FileWithPreview[]>>;
// }

// function ProductImageFileCard<TFieldValues extends FieldValues>({
//   i,
//   file,
//   name,
//   setValue,
//   files,
//   setFiles,
// }: ProductImageFileCardProps<TFieldValues>) {
//   const [isOpen, setIsOpen] = useState(false);
//   const [cropData, setCropData] = useState<string | null>(null);
//   const cropperRef = useRef<ReactCropperElement>(null);

//   // Crop image
//   const onCrop = useCallback(() => {
//     if (!files || !cropperRef.current) return;
//     setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());

//     cropperRef.current?.cropper.getCroppedCanvas().toBlob((blob) => {
//       if (!blob) return;
//       const croppedImage = new File([blob], file.name, {
//         type: file.type,
//         lastModified: Date.now(),
//       });
//       files.splice(i, 1, croppedImage as FileWithPreview);
//       setValue(name, files as PathValue<TFieldValues, Path<TFieldValues>>);
//     });
//   }, [file.name, file.type, files, i, name, setValue]);

//   // Crop image on enter key press
//   useEffect(() => {
//     function handleKeydown(e: KeyboardEvent) {
//       if (e.key === "Enter") {
//         onCrop();
//         setIsOpen(false);
//       }
//     }
//     document.addEventListener("keydown", handleKeydown);
//     return () => document.removeEventListener("keydown", handleKeydown);
//   }, [onCrop]);

//   return (
//     <AspectRatio ratio={4 / 3} className="relative">
//       <Image
//         src={cropData ? cropData : file.preview}
//         alt={file.name}
//         loading="lazy"
//         width={9999}
//         height={9999}
//         className="w-full h-full object-cover rounded-lg"
//       />
//       <div className="flex flex-col gap-2 absolute top-2 right-2">
//         <Button
//           type="button"
//           variant="secondary"
//           size="sm"
//           className="h-7 w-7 p-0"
//           onClick={() => {
//             if (!files) return;
//             setFiles(files.filter((_, j) => j !== i));
//             setValue(
//               name,
//               files.filter((_, j) => j !== i) as PathValue<
//                 TFieldValues,
//                 Path<TFieldValues>
//               >,
//               {
//                 shouldValidate: true,
//               }
//             );
//           }}
//         >
//           <Icons.clear className="h-4 w-4" aria-hidden="true" />
//           <span className="sr-only">Remove file</span>
//         </Button>
//         {file.type.startsWith("image") && (
//           <Dialog open={isOpen} onOpenChange={setIsOpen}>
//             <DialogTrigger asChild>
//               <Button
//                 type="button"
//                 variant="secondary"
//                 size="sm"
//                 className="h-7 w-7 p-0"
//               >
//                 <Icons.crop className="h-4 w-4" aria-hidden="true" />
//                 <span className="sr-only">Crop image</span>
//               </Button>
//             </DialogTrigger>
//             <DialogContent>
//               <p className="absolute left-5 top-4 text-base font-medium text-muted-foreground">
//                 Crop image
//               </p>
//               <div className="mt-8 grid place-items-center space-y-5">
//                 <AspectRatio ratio={1/1}>
//                 <Cropper
//                   ref={cropperRef}
//                   className="w-full h-full object-cover"
//                   aspectRatio={4 / 3}
//                   preview=".img-preview"
//                   src={file.preview}
//                   viewMode={1}
//                   minCropBoxHeight={10}
//                   minCropBoxWidth={10}
//                   background={false}
//                   responsive={true}
//                   autoCropArea={1}
//                   checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
//                   guides={true}
//                 />
//                 </AspectRatio>
                
//                 <div className="flex items-center justify-center gap-2">
//                   <Button
//                     aria-label="Crop image"
//                     type="button"
//                     size="sm"
//                     className="h-8"
//                     onClick={() => {
//                       onCrop();
//                       setIsOpen(false);
//                     }}
//                   >
//                     <Icons.crop
//                       className="mr-2 h-3.5 w-3.5"
//                       aria-hidden="true"
//                     />
//                     Crop Image
//                   </Button>
//                   <Button
//                     aria-label="Reset crop"
//                     type="button"
//                     variant="outline"
//                     size="sm"
//                     className="h-8"
//                     onClick={() => {
//                       cropperRef.current?.cropper.reset();
//                       setCropData(null);
//                     }}
//                   >
//                     <Icons.reset
//                       className="mr-2 h-3.5 w-3.5"
//                       aria-hidden="true"
//                     />
//                     Reset Crop
//                   </Button>
//                 </div>
//               </div>
//             </DialogContent>
//           </Dialog>
//         )}
//       </div>
//     </AspectRatio>
//   );
// }