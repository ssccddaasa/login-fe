

export type LogingFormValues = {
    email: string;
    password: string;
};
export type ErrorsType = Partial<Record<keyof LogingFormValues, string>>;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*/;

export function validateLogin({ email, password }: LogingFormValues): ErrorsType {
    const errors: ErrorsType = {};
    if (!email) {
        errors.email = 'Email is required';
    } else if (!emailRegex.test(email)) {
        errors.email = 'Email address is invalid';
    }
    if (!password) {
        errors.password = 'Password is required';
    } else if (!passwordRegex.test(password)) {
        errors.password = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
    } else if (password.length < 8) {
        errors.password = 'Password must be at least 8 characters';
    }
    return errors;
}