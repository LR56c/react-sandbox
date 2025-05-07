import WorkspaceProvider from "@/app/workspace/workspace_provider"

export default function WorkspaceLayout( { children } ) {
  return (
    <div>
      <WorkspaceProvider>
        { children }
      </WorkspaceProvider>
    </div>
  )
}
