import Image from "next/image"
import { Github, Linkedin, Twitter } from "lucide-react"

interface TeamMemberCardProps {
  name: string
  role: string
  bio: string
  imageSrc: string
  linkedin?: string
  twitter?: string
  github?: string
}

export function TeamMemberCard({ name, role, bio, imageSrc, linkedin, twitter, github }: TeamMemberCardProps) {
  return (
    <div className="bg-white dark:bg-gray-700 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all group border border-gray-100 dark:border-gray-600">
      <div className="aspect-square relative">
        <Image
          src={imageSrc || "/placeholder.svg"}
          alt={name}
          width={400}
          height={400}
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-1 dark:text-white">{name}</h3>
        <p className="text-primary dark:text-primary-foreground font-medium mb-3">{role}</p>
        <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">{bio}</p>
        <div className="flex gap-3">
          {linkedin && (
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-primary dark:hover:text-primary-foreground transition-colors"
              aria-label={`${name}'s LinkedIn profile`}
            >
              <Linkedin className="h-5 w-5" />
            </a>
          )}

          {twitter && (
            <a
              href={twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-primary dark:hover:text-primary-foreground transition-colors"
              aria-label={`${name}'s Twitter profile`}
            >
              <Twitter className="h-5 w-5" />
            </a>
          )}

          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-primary dark:hover:text-primary-foreground transition-colors"
              aria-label={`${name}'s GitHub profile`}
            >
              <Github className="h-5 w-5" />
            </a>
          )}
        </div>
      </div>
    </div>
  )
}