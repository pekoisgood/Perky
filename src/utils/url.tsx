import { headers } from "next/dist/client/components/headers";

const headersData = headers();
export const protocol = headersData.get("x-forwarded-proto");
export const host = headersData.get("host");
