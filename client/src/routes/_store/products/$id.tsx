import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_store/products/$id')({
  component: () => <div>Hello /_store/products/$id!</div>
})