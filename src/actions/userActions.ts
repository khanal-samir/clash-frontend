"use server";

import { REGISTER_URL } from "@/lib/apiEndPoints";
import axios, { AxiosError } from "axios";

export async function registerAction(prevState: any, formData: FormData) {
  try {
    const { data } = await axios.post(REGISTER_URL, {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    });

    return {
      status: 201,
      message:
        (data?.message as string) ??
        "User Register successfully.Please verify your email",
    };
  } catch (error: any) {
    console.log(error);

    if (error instanceof AxiosError && error.response?.status === 422) {
      return {
        status: 422,
        message: error?.response?.data?.message as string,
        errors: error?.response?.data?.data,
      };
    }
    if (error instanceof AxiosError) {
      return {
        status: 400,
        message: error?.response?.data?.message as string,
      };
    }
    return {
      status: 500,
      message: "Something went wrong. Please try again.",
    };
  }
}
