import type { Member } from "@/lib/types/database";
import Card from "@/app/components/ui/Card";
import Badge from "@/app/components/ui/Badge";

interface AlumniCardProps {
  member: Member;
}

export default function AlumniCard({ member }: AlumniCardProps) {
  return (
    <Card>
      <div className="p-5">
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
            {member.photo_url ? (
              <img
                src={member.photo_url}
                alt={member.name_en}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm font-bold">
                {member.name_en.charAt(0)}
              </div>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-text-primary text-sm">
              {member.name_en}
            </h3>
            <p className="text-xs text-text-secondary">{member.name}</p>
            <div className="flex items-center gap-2 mt-1">
              {member.course_label && (
                <Badge variant="muted">{member.course_label}</Badge>
              )}
              {member.affiliation && (
                <span className="text-xs text-accent font-medium">
                  {member.affiliation}
                </span>
              )}
            </div>
          </div>
        </div>

        {member.dissertation_title && (
          <p className="mt-3 text-xs text-text-secondary leading-relaxed line-clamp-2">
            {member.dissertation_title}
          </p>
        )}
      </div>
    </Card>
  );
}
