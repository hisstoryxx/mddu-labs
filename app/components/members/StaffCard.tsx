import type { Member } from "@/lib/types/database";
import Card from "@/app/components/ui/Card";
import { Mail } from "lucide-react";

interface StaffCardProps {
  member: Member;
}

export default function StaffCard({ member }: StaffCardProps) {
  return (
    <Card>
      <div className="p-5 flex items-center gap-4">
        <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
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
        <div>
          <h3 className="font-semibold text-text-primary">
            {member.name_en}
          </h3>
          <p className="text-sm text-text-secondary">{member.name}</p>
          <p className="text-xs text-text-muted mt-1">
            {member.course_label}
          </p>
          {member.email && (
            <p className="text-xs text-text-secondary mt-2 flex items-center gap-1">
              <Mail className="w-3 h-3" />
              {member.email}
            </p>
          )}
        </div>
      </div>
    </Card>
  );
}
