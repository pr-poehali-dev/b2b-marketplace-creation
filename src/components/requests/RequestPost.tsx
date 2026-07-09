import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { getRequestHeat, timeAgo } from '@/utils/requestHeat';
import { avatarColor, initials } from '@/utils/companyAvatar';
import { BuyerRequest } from './RequestCard';

const heatStyles = {
  hot: { badge: 'bg-red-100 text-red-700', icon: 'Flame', dot: 'bg-red-500' },
  warm: { badge: 'bg-amber-100 text-amber-700', icon: 'TrendingUp', dot: 'bg-amber-500' },
  cool: { badge: 'bg-slate-100 text-slate-600', icon: 'Snowflake', dot: 'bg-slate-400' },
};

interface Props {
  request: BuyerRequest;
  onRespond: (r: BuyerRequest) => void;
  isAdmin?: boolean;
  onDelete?: (r: BuyerRequest) => void;
}

const RequestPost = ({ request, onRespond, isAdmin, onDelete }: Props) => {
  const heat = getRequestHeat(request);
  const st = heatStyles[heat.level];
  const author = request.company_name || request.contact_name || 'Покупатель';

  return (
    <div className="bg-white border rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden animate-fade-in-up">
      {/* Шапка автора */}
      <div className="flex items-center gap-3 px-5 pt-4">
        <div className={`w-11 h-11 rounded-full ${avatarColor(author)} flex items-center justify-center text-white font-semibold text-sm flex-shrink-0`}>
          {initials(author)}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <p className="font-semibold text-gray-900 truncate">{author}</p>
            <Icon name="BadgeCheck" size={15} className="text-primary flex-shrink-0" />
          </div>
          <p className="text-xs text-gray-400 flex items-center gap-1">
            <Icon name="Clock" size={11} />
            {timeAgo(request.created_at)}
            <span className="mx-1">·</span>
            ищет поставщика
          </p>
        </div>
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <Badge className={`text-xs ${st.badge} border-0`}>
            <Icon name={st.icon} size={12} className="mr-1" />
            {heat.label}
          </Badge>
          {isAdmin && onDelete && (
            <button
              onClick={() => onDelete(request)}
              className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
              title="Удалить заявку (админ)"
            >
              <Icon name="Trash2" size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Тело поста */}
      <div className="px-5 py-3">
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="secondary" className="text-xs">
            <Icon name="Tag" size={11} className="mr-1" />
            {request.category}
          </Badge>
          <span className="flex items-center gap-1 text-xs text-gray-400">
            <span className={`w-1.5 h-1.5 rounded-full ${st.dot}`} />
            Актуальность {heat.score}%
          </span>
        </div>

        <h3 className="font-bold text-gray-900 text-lg leading-snug mb-1.5">{request.title}</h3>
        <p className="text-sm text-gray-600 whitespace-pre-line line-clamp-4">{request.description}</p>

        {/* Параметры заявки чипсами */}
        <div className="flex flex-wrap gap-2 mt-3">
          {request.quantity && (
            <span className="inline-flex items-center gap-1 text-xs bg-gray-50 text-gray-600 px-2.5 py-1 rounded-full">
              <Icon name="Package" size={12} /> {request.quantity} {request.unit}
            </span>
          )}
          {request.budget && (
            <span className="inline-flex items-center gap-1 text-xs bg-gray-50 text-gray-600 px-2.5 py-1 rounded-full">
              <Icon name="Wallet" size={12} /> {request.budget}
            </span>
          )}
          {request.region && (
            <span className="inline-flex items-center gap-1 text-xs bg-gray-50 text-gray-600 px-2.5 py-1 rounded-full">
              <Icon name="MapPin" size={12} /> {request.region}
            </span>
          )}
          {request.deadline && (
            <span className="inline-flex items-center gap-1 text-xs bg-gray-50 text-gray-600 px-2.5 py-1 rounded-full">
              <Icon name="CalendarClock" size={12} /> {request.deadline}
            </span>
          )}
        </div>

        {/* Подсказка */}
        <div className="flex items-start gap-2 mt-3 p-2.5 rounded-lg bg-primary/5 text-xs text-gray-600">
          <Icon name="Sparkles" size={14} className="text-primary flex-shrink-0 mt-0.5" />
          {heat.hint}
        </div>
      </div>

      {/* Футер: статистика + отклик */}
      <div className="flex items-center justify-between px-5 py-3 border-t bg-gray-50/60">
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <span className="flex items-center gap-1.5">
            <Icon name="MessageSquare" size={16} className="text-primary" />
            <b className="text-gray-900">{request.responses_count}</b>
            <span className="hidden sm:inline">откликов</span>
          </span>
          <span className="flex items-center gap-1.5">
            <Icon name="Send" size={15} />
            {request.matched_suppliers}
            <span className="hidden sm:inline">получили</span>
          </span>
        </div>
        <Button size="sm" onClick={() => onRespond(request)} className="rounded-full">
          <Icon name="Reply" size={16} className="mr-1.5" />
          Откликнуться
        </Button>
      </div>
    </div>
  );
};

export default RequestPost;