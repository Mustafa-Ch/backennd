// src/auth/dto/auth.dto.ts
export class RegisterDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export class LoginDto {
  email: string;
  password: string;
}
