import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import Icon from "@/components/ui/icon";

interface Message {
  id: string;
  sender: "user" | "supplier";
  text: string;
  timestamp: Date;
}

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  supplier: string;
}

interface SupplierChatProps {
  product: Product;
  onClose: () => void;
}

const SupplierChat = ({ product, onClose }: SupplierChatProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "supplier",
      text: `Здравствуйте! Интересуетесь товаром "${product.name}"?`,
      timestamp: new Date(Date.now() - 300000)
    },
    {
      id: "2", 
      sender: "supplier",
      text: "Готов обсудить условия поставки и возможные скидки при оптовых закупках.",
      timestamp: new Date(Date.now() - 240000)
    }
  ]);
  
  const [newMessage, setNewMessage] = useState("");

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: newMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, message]);
    setNewMessage("");

    // Имитация ответа поставщика
    setTimeout(() => {
      const supplierResponse: Message = {
        id: (Date.now() + 1).toString(),
        sender: "supplier", 
        text: "Спасибо за вопрос! Отвечу в ближайшее время.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, supplierResponse]);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-full max-w-2xl h-[600px] flex flex-col">
        <CardHeader className="flex-row items-center justify-between space-y-0 pb-3">
          <CardTitle className="flex items-center gap-2">
            <Icon name="MessageCircle" size={20} />
            Чат с поставщиком
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <Icon name="X" size={16} />
          </Button>
        </CardHeader>

        <Separator />

        {/* Карточка товара в чате */}
        <div className="p-4 bg-gray-50">
          <div className="flex gap-3">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-16 h-16 object-cover rounded-lg bg-gray-200"
            />
            <div className="flex-1">
              <h4 className="font-semibold text-sm">{product.name}</h4>
              <p className="text-xs text-gray-600">Поставщик: {product.supplier}</p>
              <p className="font-bold text-teal-800">{product.price.toLocaleString()} ₽</p>
            </div>
            <Badge variant="outline" className="self-start">
              <Icon name="Users" size={12} className="mr-1" />
              Онлайн
            </Badge>
          </div>
        </div>

        <Separator />

        {/* Сообщения */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs rounded-lg p-3 ${
                    message.sender === "user"
                      ? "bg-teal-800 text-white"
                      : "bg-gray-100 text-gray-900"
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p className={`text-xs mt-1 ${
                    message.sender === "user" ? "text-teal-200" : "text-gray-500"
                  }`}>
                    {message.timestamp.toLocaleTimeString().slice(0, 5)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <Separator />

        {/* Поле ввода */}
        <div className="p-4">
          <div className="flex gap-2">
            <Input
              placeholder="Напишите сообщение..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            />
            <Button onClick={sendMessage}>
              <Icon name="Send" size={16} />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SupplierChat;