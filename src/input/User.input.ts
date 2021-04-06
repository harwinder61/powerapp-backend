import { IsEmail, MinLength, MaxLength, IsOptional, IsNumber, IsString } from "class-validator";

export class UserInput {
  @IsEmail()
  email: string;

  @IsOptional()
  @MinLength(6)
  password: string;

  @IsOptional()
  @MaxLength(100)
  name?: string;

  @IsNumber()
  role_id?: number;

  @IsNumber()
  zip_code?: string;

  @IsNumber()
  active?: number;

  @IsNumber()
  amount?: number;

  @IsOptional()
  stripe_id?: string;

  @IsString()
  country?: string;

  @IsString()
  state?: string;

  @IsString()
  city?: string;

  @IsOptional()
  username?: string;
 

}
