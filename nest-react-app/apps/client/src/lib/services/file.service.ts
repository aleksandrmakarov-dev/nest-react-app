import axios from "@/lib/axios";

const baseUrl = "/files";

async function upload(file: File) {
  const formData = new FormData();
  formData.append("file", file);
  const response = await axios.post<string>(`${baseUrl}/upload`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
}

export default {
  upload,
};
