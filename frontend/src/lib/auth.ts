import { api } from "@/lib/api-client";
import { z } from "zod";

// Define the shape of the registration data using Zod for validation
export const registerSchema = z
    .object({
        username: z.string().min(3, "نام کاربری باید حداقل ۳ حرف باشد"),
        email: z.string().email("ایمیل وارد شده صحیح نیست"),
        password: z.string().min(8, "رمز عبور باید حداقل ۸ حرف باشد"),
        password2: z.string(),
    })
    .refine((data) => data.password === data.password2, {
        message: "رمزهای عبور یکسان نیستند",
        path: ["password2"], // path to show the error on
    });

// Define the type from the schema
export type RegisterInput = z.infer<typeof registerSchema>;

// The function that sends the registration request to the backend
export async function registerUser(data: RegisterInput) {
    const response = await api.post("/jwt/register/", data);
    return response.data;
}

// Zod schema for login
export const loginSchema = z.object({
    email: z.string().email("ایمیل وارد شده صحیح نیست"),
    password: z.string().min(1, "رمز عبور الزامی است"),
});

// Define the type from the schema
export type LoginInput = z.infer<typeof loginSchema>;

// The function that sends the login request to the backend
export async function loginUser(data: LoginInput) {
    const response = await api.post("/jwt/", data); // This is the token_obtain_pair endpoint
    return response.data;
}