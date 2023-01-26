import { useSearchParams } from "react-router-dom";

// Lấy queryParams trên URL
export default function useQueryParams() {
  const [searchParams] = useSearchParams()
  return Object.fromEntries([...searchParams])
}