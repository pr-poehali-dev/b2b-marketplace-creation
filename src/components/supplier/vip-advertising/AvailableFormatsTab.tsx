import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { VIPAdFormat, getPriceDisplay } from './types';
import LockedFormatsSection from './LockedFormatsSection';

interface AvailableFormatsTabProps {
  availableFormats: VIPAdFormat[];
  lockedFormats: VIPAdFormat[];
}

export default function AvailableFormatsTab({ availableFormats, lockedFormats }: AvailableFormatsTabProps) {
  return (
    <div className="space-y-4">
      {/* Доступные форматы */}
      {availableFormats.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Crown" size={20} />
              VIP форматы рекламы
            </CardTitle>
            <CardDescription>
              Эксклюзивные рекламные форматы для вашего тарифа
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {availableFormats.map((format) => (
                <Card key={format.id} className="border-2 border-purple-200 bg-purple-50">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg flex items-center gap-2">
                          {format.name}
                          {format.tier === 'enterprise' && (
                            <Badge className="bg-gold-100 text-gold-800">
                              👑 Эксклюзив
                            </Badge>
                          )}
                        </CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge className="bg-green-100 text-green-800">
                            {getPriceDisplay(format)}
                          </Badge>
                          {format.active && (
                            <Badge className="bg-emerald-100 text-emerald-800">
                              ⚡ Активна
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <CardDescription>{format.description}</CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Размещение:</h4>
                      <div className="flex flex-wrap gap-1">
                        {format.placements.map((placement, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {placement}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Производительность:</h4>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="text-center p-2 bg-emerald-100 rounded">
                          <div className="font-bold text-emerald-700">{format.performance.averageCTR}%</div>
                          <div className="text-emerald-700">CTR</div>
                        </div>
                        <div className="text-center p-2 bg-green-100 rounded">
                          <div className="font-bold text-green-600">{format.performance.averageROI}%</div>
                          <div className="text-green-700">ROI</div>
                        </div>
                        <div className="text-center p-2 bg-purple-100 rounded">
                          <div className="font-bold text-purple-600">{format.performance.impressionsPerDay.toLocaleString()}</div>
                          <div className="text-purple-700">показов/день</div>
                        </div>
                        <div className="text-center p-2 bg-orange-100 rounded">
                          <div className="font-bold text-orange-600">{format.performance.conversionRate}%</div>
                          <div className="text-orange-700">конверсия</div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Особенности:</h4>
                      <ul className="space-y-1">
                        {format.features.slice(0, 3).map((feature, index) => (
                          <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                            <Icon name="Star" size={12} className="text-purple-500" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button 
                        className="flex-1" 
                        variant={format.active ? "outline" : "default"}
                      >
                        {format.active ? (
                          <>
                            <Icon name="Settings" size={16} className="mr-2" />
                            Настроить
                          </>
                        ) : (
                          <>
                            <Icon name="Play" size={16} className="mr-2" />
                            Запустить
                          </>
                        )}
                      </Button>
                      <Button variant="outline" size="sm">
                        <Icon name="Info" size={16} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Заблокированные форматы */}
      <LockedFormatsSection lockedFormats={lockedFormats} />
    </div>
  );
}