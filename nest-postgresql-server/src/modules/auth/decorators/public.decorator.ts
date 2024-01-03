import { SetMetadata } from "@nestjs/common";
import { AUTHORIZE_PUBLIC } from "../auth.constants";

export const Public = () => SetMetadata(AUTHORIZE_PUBLIC, true);
