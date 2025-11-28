import { cn } from "@/lib/utils";
import { Link } from '@inertiajs/react';
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PaginationLinks, PaginationMeta } from "../types";
import { Button } from "./ui/button";

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
                  <Button variant="ghost" asChild>
                    <Link href={links.prev} className="mr-2"> 
                      <ChevronLeft className="size-4"/>
                      <span> Previous </span> </Link>
                </Button>
              )}
              </div>
              <p className="text-sm font-medium"> page {meta.current_page} of {meta.last_page} </p>

              <div> 
                {links.next && (
                  <Button variant="ghost" asChild>
                    <Link href={links.next} className="mr-2">
                      <ChevronRight className="size-4"/>
                      <span> Next </span>
                    </Link>
                  </Button>
                )}
              </div>
            </div>);
}