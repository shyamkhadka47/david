

export async function downloadImage(filename: string) {
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_URI}/${filename}`,
  );
const blob= await res.blob()

const file=  new File([blob], filename.split("-").slice(1).join("-"), {type:blob.type})
return file
}

