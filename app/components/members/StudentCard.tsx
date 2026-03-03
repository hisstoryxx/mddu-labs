import type { Member } from "@/lib/types/database";
import Card from "@/app/components/ui/Card";
import Badge from "@/app/components/ui/Badge";

interface StudentCardProps {
  member: Member;
  onClick: () => void;
}

export default function StudentCard({ member, onClick }: StudentCardProps) {
  return (
    <Card className="cursor-pointer" onClick={onClick}>
      <div className="p-5">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
            {member.photo_url ? (
              <img
                src={member.photo_url}
                alt={member.name_en}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400 text-xl font-bold">
                {member.name_en.charAt(0)}
              </div>
            )}
          </div>
          <div className="min-w-0">
            <h3 className="font-semibold text-text-primary truncate">
              {member.name_en}
            </h3>
            <p className="text-sm text-text-secondary">{member.name}</p>
            {member.course_label && (
              <Badge variant="accent" className="mt-1">
                {member.course_label}
              </Badge>
            )}
          </div>
        </div>

        {member.research_interests.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1">
            {member.research_interests.slice(0, 3).map((ri, i) => (
              <span
                key={i}
                className="text-xs text-text-muted bg-gray-50 px-2 py-0.5 rounded"
              >
                {ri}
              </span>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}
