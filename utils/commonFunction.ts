import apiEndpoints from "./apiEndpoints";
import axios from "axios";
import { toast } from "react-hot-toast";
import { AxiosError } from "axios";

export const markAsCompleted = async(userId: string, courseId: string, token: string) => {
  try {
    const config = {
      headers: {
        Authorization: token,
      },
    };
    const response = await axios.patch(
      apiEndpoints.markAsCompleted(userId, courseId),
      {},
      config
    );
    if(response.status == 200){
      toast.success(response.data.message);
      return 1;
    }
    if(response.status == 400){
      toast.error("Error marking course as completed");
      return 0;
    }
    if(response.status == 401){
      toast.error("session expired");
    }
  } catch (error) {
    if(error instanceof AxiosError){
      toast.error("Error marking course as completed");
      return 0;
  }
  };
};