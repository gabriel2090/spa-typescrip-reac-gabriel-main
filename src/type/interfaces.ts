export interface RegisterFormData {
    nombre: string;
    apellido: string;
    edad: number;
    email: string;
    password: string;
}

export interface LoginFormData {
    email: string;
    password: string;
}