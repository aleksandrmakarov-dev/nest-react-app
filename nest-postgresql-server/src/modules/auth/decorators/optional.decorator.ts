import { SetMetadata } from "@nestjs/common";
import { AUTHORIZE_OPTIONAL } from "../auth.constants";

export const Optional = () => SetMetadata(AUTHORIZE_OPTIONAL, true);
