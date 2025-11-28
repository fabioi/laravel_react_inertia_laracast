import { PaginatedResponse, Puppy } from "../types";

export function Pagination({ pagination }: { pagination: PaginatedResponse<Puppy> }) {
      return <pre> {JSON.stringify(pagination, null, 2)} </pre>;
}