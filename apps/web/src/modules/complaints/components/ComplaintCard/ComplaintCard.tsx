import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '@ams/ui';
import { formatDate } from '@/utils/formatDate';
import { ComplaintStatusBadge } from '../ComplaintStatusBadge';
import type { ComplaintListItem } from '../../types/complaint.types';
import { COMPLAINT_ROUTES } from '../../constants/complaint.constants';

export interface ComplaintCardProps {
  complaint: ComplaintListItem;
}

export function ComplaintCard({ complaint }: ComplaintCardProps) {
  const navigate = useNavigate();

  return (
    <Card
      className="cursor-pointer transition-shadow hover:shadow-md"
      onClick={() => void navigate(COMPLAINT_ROUTES.DETAIL.replace(':id', complaint.id))}
    >
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <p className="line-clamp-2 font-medium">{complaint.title}</p>
          <ComplaintStatusBadge priority={complaint.priority} />
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">{complaint.categoryName}</span>
          <ComplaintStatusBadge status={complaint.status} />
        </div>
        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            {complaint.residentName} · Unit {complaint.unitNumber}
          </p>
        </div>
        {complaint.assignedTo && (
          <p className="text-xs text-muted-foreground">Assigned: {complaint.assignedTo}</p>
        )}
        <p className="text-xs text-muted-foreground">{formatDate(complaint.complaintDate)}</p>
      </CardContent>
    </Card>
  );
}
