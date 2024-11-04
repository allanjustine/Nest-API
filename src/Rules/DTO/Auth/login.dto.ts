import {
  IsString,
  IsNotEmpty,
} from 'class-validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty({ message: 'Username or email is required' })
  usernameOrEmail: string;

  @IsNotEmpty({ message: 'Password is required' })
  password: string;
  
  remember_token?: string;
}