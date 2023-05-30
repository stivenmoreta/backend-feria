import { IsEmail, IsOptional, IsString, Matches, MaxLength, MinLength } from 'class-validator';


export class CreateUserDto {

    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    @MaxLength(50)
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'The password must have a Uppercase, lowercase letter and a number'
    })
    password: string;

    @IsString()
    @Matches(/^[a-zA-Z]+$/,{ message:'first name is not valid, only word'})
    pnombre: string;

    @IsString()
    @IsOptional()
    @Matches(/^[a-zA-Z]+$/,{ message:'second name is not valid, only word'})
    snombre: string;

    @IsString()
    @Matches(/^[a-zA-Z]+$/,{ message:'last name is not valid, only word'})
    apellidop: string;

    @IsString()
    @Matches(/^[a-zA-Z]+$/,{ message:"mother's last name is not valid, only word"})
    apellidom: string;
}