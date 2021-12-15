import { IsDate, IsEmail, IsEnum, IsNotEmpty, Matches } from "class-validator";
import { MesssageHelper } from "src/helpers/messages.helper";
import { RegexHelper } from "src/helpers/regex.helper";

export enum Gender {
    M = "M",
    F = "F",
}

export class CreateUserDto {
    @IsNotEmpty()
    cpf: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @IsDate()
    birthday: Date;

    @IsEnum(Gender)
    @IsNotEmpty()
    gender: Gender;

    @IsNotEmpty()
    phone_number: string;

    @IsNotEmpty()
    @Matches(RegexHelper.Password, { message: MesssageHelper.PASSWORD_VALID })
    password: string;
}
