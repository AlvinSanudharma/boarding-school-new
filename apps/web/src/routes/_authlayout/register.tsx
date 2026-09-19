import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authlayout/register')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authlayout/register"!</div>
}
