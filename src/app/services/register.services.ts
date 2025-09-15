'use server';

import { formStateType, registerFormSchema } from "@/schema/register.schema";

export async function handleRegister(formState: formStateType, formData: FormData) : Promise<formStateType> {
    // console.log('Handle register' ,formData)

    const formValues = {
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
        rePassword: formData.get('rePassword'),
        phone: formData.get('phone'),
    };
    // console.log(formValues);

    const parseData = registerFormSchema.safeParse(formValues);
    if (!parseData.success) {
        return {
            success: false,
            error: parseData.error?.flatten().fieldErrors,
            message: null
        }
    }

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formValues)
        });

        const data = await res.json();
        console.log(data);
        if (!res.ok) {
            return { 
                success: false,
                error: {},
                message: data.message
            }
        }
        return { 
                success: true,
                error: {},
                message: data.message
            }

    } catch (error) {
        console.log(error);
        return {
            success: false,
            error: {},
            message: (error as string) || 'Something went wrong!'
        };
    }
}