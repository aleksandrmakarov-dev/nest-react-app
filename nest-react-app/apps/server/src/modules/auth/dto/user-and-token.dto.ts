import { UserDataDto } from "./user-data.dto";

export class UserAndTokenDto {
  refreshToken: string;
  userData: UserDataDto;
}
