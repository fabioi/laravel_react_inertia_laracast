import { cn } from "@/lib/utils";
import { PaginationLinks, PaginationMeta } from "../types";
import { Button } from "./ui/button";
import { Link } from '@inertiajs/react';

type PaginationProps = {
  meta: PaginationMeta;
  links: PaginationLinks;
  className?: string;
}


export function Pagination({ meta, links, className }: PaginationProps) {

            return (
            <div className={cn("flex items-center justify-between", className)}>
              <div> 
                {links.prev && (
                  <Button asChild>
                    <Link href={links.prev} className="mr-2"> Previous </Link>
                </Button>
              )}
              </div>

              <div> 
                {links.next && (
                  <Button asChild>
                    <Link href={links.next} className="mr-2"> Next </Link>
                </Button>
              )}
              </div>
            </div>);
}