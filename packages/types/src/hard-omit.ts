import { OmitByValue } from "utility-types";

type Props = { req: number; reqUndef: string | undefined; opt?: number };

type Type = OmitByValue<Props, string | undefined>;
