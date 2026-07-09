import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { getRequestHeat, timeAgo } from '@/utils/requestHeat';

export interface BuyerRequest {
  id: number;
  title: string;
  category: string;
  description: string;
  quantity?: string;
  unit?: string;
  budget?: string;
  region?: string;
  deadline?: string;
  status: string;
  matched_suppliers: number;
  responses_count: number;
  company_name?: string;
  contact_name?: string;
  created_at: string | null;
}

const heatStyles = {
  hot: { badge: 'bg-red-100 text-red-700 border border-red-200', icon: 'Flame', bar: 'bg-red-500' },
  warm: { badge: 'bg-amber-100 text-amber-700 border border-amber-200', icon: 'TrendingUp', bar: 'bg-amber-500' },
  cool: { badge: 'bg-slate-100 text-slate-600 border border-slate-200', icon: 'Snowflake', bar: 'bg-slate-400' },
};

interface Props {
  request: BuyerRequest;
  onRespond: (r: BuyerRequest) => void;
  isAdmin?: boolean;
  onDelete?: (r: BuyerRequest) => void;
}

const RequestCard = ({ request, onRespond, isAdmin, onDelete }: Props) => {
  const heat = getRequestHeat(request);
  const st = heatStyles[heat.level];

  return (
    <Card className="hover:shadow-md transition-shadow overflow-hidden">
      {/* Полоска горячести */}
      <div className="h-1 w-full bg-gray-100">
        <div className={`h-full ${st.bar} transition-all`} style={{ width: `${heat.score}%` }} />
      </div>
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <Badge className={`text-xs ${st.badge}`}>
                <Icon name={st.icon} size={12} className="mr-1" />
                {heat.label} · {heat.score}
              </Badge>
              <Badge variant="secondary" className="text-xs">{request.category}</Badge>
              <span className="text-xs text-gray-400">{timeAgo(request.created_at)}</span>
            </div>
            <h3 className="font-semibold text-gray-900 text-lg leading-snug">{request.title}</h3>
          </div>
          {isAdmin && onDelete && (
            <button
              onClick={() => onDelete(request)}
              className="flex-shrink-0 p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
              title="Удалить заявку (админ)"
            >
              <Icon name="Trash2" size={18} />
            </button>
          )}
        </div>

        <p className="text-sm text-gray-600 line-clamp-2 mb-3">{request.description}</p>

        <div className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-gray-500 mb-3">
          {request.quantity && (
            <span className="flex items-center gap-1">
              <Icon name="Package" size={14} /> {request.quantity} {request.unit}
            </span>
          )}
          {request.budget && (
            <span className="flex items-center gap-1">
              <Icon name="Wallet" size={14} /> {request.budget}
            </span>
          )}
          {request.region && (
            <span className="flex items-center gap-1">
              <Icon name="MapPin" size={14} /> {request.region}
            </span>
          )}
          {request.deadline && (
            <span className="flex items-center gap-1">
              <Icon name="Clock" size={14} /> {request.deadline}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 mb-3 p-2 rounded-lg bg-gray-50 text-xs text-gray-500">
          <Icon name="Lightbulb" size={14} className="text-primary flex-shrink-0" />
          {heat.hint}
        </div>

        <div className="flex items-center justify-between gap-3 pt-1">
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <Icon name="MessageSquare" size={14} />
              {request.responses_count} откл.
            </span>
            <span className="flex items-center gap-1">
              <Icon name="Send" size={14} />
              {request.matched_suppliers} получ.
            </span>
          </div>
          <Button size="sm" onClick={() => onRespond(request)}>
            <Icon name="Reply" size={16} className="mr-1.5" />
            Откликнуться
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RequestCard;