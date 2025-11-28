import { cn } from "@/lib/utils";
import { PaginationLinks, PaginationMeta } from "../types";

type PaginationProps = {
  meta: PaginationMeta;
  links: PaginationLinks;
  className?: string;
}


export function Pagination({ meta, links, className }: PaginationProps) {

            return (
            <div className={cn("flex items-center justify-between", className)}>
             {JSON.stringify({meta, links}, null, 2)} 
            </div>);
}