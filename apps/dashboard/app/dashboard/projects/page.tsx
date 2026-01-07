'use client'

import { Card, Title, Text, Badge } from '@tremor/react'
import { Folder, Plus, MoreVertical, Clock } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useAuth } from '@clerk/nextjs'
import { formatDistanceToNow } from 'date-fns'

interface Project {
  id: string
  name: string
  description: string | null
  scanCount: number
  lastActivity: string
  status: 'active' | 'archived'
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [showNewProject, setShowNewProject] = useState(false)
  const { userId } = useAuth()

  useEffect(() => {
    async function fetchProjects() {
      if (!userId) {
        setLoading(false)
        return
      }

      try {
        // For now, create projects from scan data
        // In the future, this would be its own API endpoint
        const response = await fetch('/api/user/scans')
        if (response.ok) {
          const data = await response.json()
          
          // Group scans by provider as pseudo-projects
          const projectMap = new Map<string, Project>()
          
          for (const scan of data.scans || []) {
            const projectId = scan.project_id || `provider-${scan.provider}`
            const projectName = scan.project_id 
              ? scan.project_name || 'Unnamed Project'
              : `${scan.provider.charAt(0).toUpperCase() + scan.provider.slice(1)} Infrastructure`
            
            if (!projectMap.has(projectId)) {
              projectMap.set(projectId, {
                id: projectId,
                name: projectName,
                description: null,
                scanCount: 0,
                lastActivity: scan.created_at,
                status: 'active',
              })
            }
            
            const project = projectMap.get(projectId)!
            project.scanCount++
            if (new Date(scan.created_at) > new Date(project.lastActivity)) {
              project.lastActivity = scan.created_at
            }
          }
          
          setProjects(Array.from(projectMap.values()))
        }
      } catch (err) {
        console.error('Failed to fetch projects:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [userId])

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-[--text]">Projects</h1>
          <p className="text-[--text-light] mt-1">
            Organize your scans and infrastructure by project.
          </p>
        </div>
        <button
          onClick={() => setShowNewProject(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          New Project
        </button>
      </div>

      {/* New Project Modal */}
      {showNewProject && (
        <Card>
          <Title>Create New Project</Title>
          <Text className="text-[--text-light] mb-4">
            Projects help you organize scans for different applications or environments.
          </Text>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Project Name</label>
              <input
                type="text"
                placeholder="e.g., Production API, Customer Portal"
                className="w-full px-3 py-2 bg-[--bg-alt] border border-[--border] rounded-lg"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Description (optional)</label>
              <textarea
                placeholder="Brief description of this project..."
                className="w-full px-3 py-2 bg-[--bg-alt] border border-[--border] rounded-lg"
                rows={3}
              />
            </div>
            
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => setShowNewProject(false)}
                className="px-4 py-2 text-[--text-light] hover:text-[--text]"
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Create Project
              </button>
            </div>
          </div>
          
          <div className="mt-4 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
            <Text className="text-yellow-500 text-sm">
              <strong>Coming Soon:</strong> Full project management with custom names, 
              team sharing, and scan organization. For now, scans are auto-grouped by provider.
            </Text>
          </div>
        </Card>
      )}

      {/* Projects Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-48 bg-[--bg-alt] rounded-lg animate-pulse" />
          ))}
        </div>
      ) : projects.length === 0 ? (
        <Card>
          <div className="text-center py-12">
            <Folder className="w-16 h-16 text-[--text-light] mx-auto mb-4" />
            <Title>No projects yet</Title>
            <Text className="text-[--text-light] mt-2 max-w-md mx-auto">
              Run your first scan to automatically create a project, or create one manually.
            </Text>
            
            <div className="mt-6">
              <pre className="p-3 bg-[--bg-alt] rounded text-sm text-[--text-light] inline-block">
                infraiq verify scan aws --sync
              </pre>
            </div>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card key={project.id} className="hover:border-blue-500 cursor-pointer transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-[--bg-alt] flex items-center justify-center">
                  <Folder className="w-6 h-6 text-blue-500" />
                </div>
                <button className="p-1 hover:bg-[--bg-alt] rounded">
                  <MoreVertical className="w-5 h-5 text-[--text-light]" />
                </button>
              </div>
              
              <Title className="text-lg">{project.name}</Title>
              {project.description && (
                <Text className="text-[--text-light] mt-1">{project.description}</Text>
              )}
              
              <div className="mt-4 pt-4 border-t border-[--border] flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-[--text-light]">
                  <Badge>{project.scanCount} scans</Badge>
                </div>
                <div className="flex items-center gap-1 text-sm text-[--text-light]">
                  <Clock className="w-4 h-4" />
                  {formatDistanceToNow(new Date(project.lastActivity), { addSuffix: true })}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
