export const downloadVideoAsFile = async (url: string): Promise<File> => {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_URI}/${url}`);

  const blob = await response.blob();

  // const filename = url.split('-')[1] || 'video.mp4';
  // console.log(filename)
  const result = url.split('-');
  let final = [];
  for (let i = 0; i < result.length; i++) {
    if (i == 0) {
      continue;
    }
    final.push(result[i]);
  }

  const filename = final.join(' ');

  return new File([blob], filename, { type: blob.type });
};
