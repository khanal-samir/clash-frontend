"use server";

import {
  CHECK_LOGIN_URL,
  FORGOT_PASSWORD,
  REGISTER_URL,
  RESET_PASSWORD,
  VERIFY_EMAIL_URL,
} from "@/lib/apiEndPoints";
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

export async function verifyEmail(prevState: any, formData: FormData) {
  try {
    const email = formData.get("email");
    const token = formData.get("token");
    const { data } = await axios.get(
      `${VERIFY_EMAIL_URL}?email=${email}&token=${token}`
    );
    return {
      status: 200,
      message:
        (data.message as string) ??
        "Email verified successfully. Please proceed to login.",
    };
  } catch (error: any) {
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

export async function checkLogin(prevState: any, formData: FormData) {
  try {
    const { data } = await axios.post(CHECK_LOGIN_URL, {
      email: formData.get("email"),
      password: formData.get("password"),
    });

    return {
      status: 200,
      data: {
        email: formData.get("email"),
        password: formData.get("password"),
      },
      message: (data?.message as string) ?? "User Login successfull.",
    };
  } catch (error: any) {
    if (error instanceof AxiosError && error.response?.status === 422) {
      return {
        status: 422,
        message: error?.response?.data?.message,
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

export async function forgotPassword(prevState: any, formData: FormData) {
  try {
    const { data } = await axios.post(FORGOT_PASSWORD, {
      email: formData.get("email"),
    });

    return {
      status: 200,
      message:
        (data?.message as string) ??
        "Password reset link sent successfully. Please check your email",
    };
  } catch (error: any) {
    if (error instanceof AxiosError && error.response?.status === 422) {
      return {
        status: 422,
        message: error?.response?.data?.message,
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

export async function changePassword(prevState: any, formData: FormData) {
  try {
    const { data } = await axios.put(RESET_PASSWORD, {
      token: formData.get("token"),
      confirmPassword: formData.get("confirmPassword"),
      email: formData.get("email"),
      password: formData.get("password"),
    });

    return {
      status: 200,
      message:
        (data?.message as string) ??
        "Password changed successfully. Proceed to login.",
    };
  } catch (error: any) {
    console.log(error.response);

    if (error instanceof AxiosError && error.response?.status === 422) {
      return {
        status: 422,
        message: error?.response?.data?.message,
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
