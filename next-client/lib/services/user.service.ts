import { UserResponseDto } from "@/lib/dto/user/user-response.dto";
import baseService from "./base.service";

const userService = baseService<any, UserResponseDto>("/users");

export default userService;
