import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageLayout from '@/components/layout/PageLayout';
import Icon from '@/components/ui/icon';
import CreateRequestForm from '@/components/requests/CreateRequestForm';
import RequestExchange from '@/components/requests/RequestExchange';
import MyRequests from '@/components/requests/MyRequests';

type Tab = 'create' | 'exchange' | 'mine';

const PlaceRequest = () => {
  const [tab, setTab] = useState<Tab>('create');
  const [refreshKey, setRefreshKey] = useState(0);

  const tabs: { key: Tab; label: string; icon: string }[] = [
    { key: 'create', label: 'Разместить заявку', icon: 'Send' },
    { key: 'exchange', label: 'Биржа заявок', icon: 'LayoutGrid' },
    { key: 'mine', label: 'Мои заявки', icon: 'FileText' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <PageLayout>
        <div className="container mx-auto px-4 py-8 max-w-5xl">
          {/* Заголовок */}
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-3">
              <Icon name="Zap" size={14} />
              Биржа заявок BM Market
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Заявки</h1>
            <p className="text-gray-600 max-w-2xl">
              Разместите заявку — и она мгновенно улетит подходящим поставщикам. А на бирже
              вы видите живую ленту заявок с «индексом горячести»: чем свежее и меньше откликов —
              тем выше ваш шанс получить заказ.
            </p>
          </div>

          {/* Вкладки */}
          <div className="flex gap-2 mb-8 bg-white border rounded-xl p-1.5 w-full sm:w-auto sm:inline-flex">
            {tabs.map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  tab === t.key
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Icon name={t.icon} size={18} />
                <span>{t.label}</span>
              </button>
            ))}
          </div>

          {tab === 'create' && (
            <CreateRequestForm onCreated={() => setRefreshKey((k) => k + 1)} />
          )}
          {tab === 'exchange' && <RequestExchange refreshKey={refreshKey} />}
          {tab === 'mine' && <MyRequests refreshKey={refreshKey} />}
        </div>
        <Footer />
      </PageLayout>
    </div>
  );
};

export default PlaceRequest;