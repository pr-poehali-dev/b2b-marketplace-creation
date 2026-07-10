import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const PRODUCTS_URL = 'https://functions.poehali.dev/65a30f37-03fa-4e12-ad16-d14f83cd61b4';

interface ProductImage {
  id: string;
  url: string;
  file?: File;
  isMain: boolean;
  isUploading?: boolean;
}

interface ProductImageUploaderProps {
  images: ProductImage[];
  onImagesChange: (images: ProductImage[] | ((prev: ProductImage[]) => ProductImage[])) => void;
  maxImages?: number;
}

const fileToBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

const ProductImageUploader: React.FC<ProductImageUploaderProps> = ({
  images,
  onImagesChange,
  maxImages = 10
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { token } = useAuth();
  const { toast } = useToast();
  const [urlInput, setUrlInput] = useState('');
  const [generationPrompt, setGenerationPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [showGenerateInput, setShowGenerateInput] = useState(false);

  const generateImageId = () => `img_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

  const handleFileUpload = async (files: FileList | null) => {
    if (!files) return;
    if (!token) {
      toast({ title: 'Войдите в аккаунт, чтобы загрузить фото', variant: 'destructive' });
      return;
    }

    const remainingSlots = maxImages - images.length;
    const filesToUpload = Array.from(files)
      .filter((f) => f.type.startsWith('image/'))
      .slice(0, remainingSlots);

    if (filesToUpload.length === 0) return;

    const pendingImages: ProductImage[] = filesToUpload.map((file, i) => ({
      id: generateImageId(),
      url: '',
      file,
      isMain: images.length === 0 && i === 0,
      isUploading: true,
    }));

    onImagesChange([...images, ...pendingImages]);

    await Promise.all(
      pendingImages.map(async (pending) => {
        try {
          const dataUrl = await fileToBase64(pending.file as File);
          const response = await fetch(`${PRODUCTS_URL}?action=upload_image`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'X-Auth-Token': token },
            body: JSON.stringify({ file_data: dataUrl, content_type: (pending.file as File).type }),
          });
          const data = await response.json();
          if (!response.ok) throw new Error(data.error || 'Не удалось загрузить изображение');

          onImagesChange((prev: ProductImage[]) =>
            prev.map((img) => (img.id === pending.id ? { ...img, url: data.url, isUploading: false } : img))
          );
        } catch (err) {
          toast({
            title: 'Ошибка загрузки изображения',
            description: err instanceof Error ? err.message : undefined,
            variant: 'destructive',
          });
          onImagesChange((prev: ProductImage[]) => prev.filter((img) => img.id !== pending.id));
        }
      })
    );
  };

  const handleUrlAdd = () => {
    if (!urlInput.trim()) return;

    const imageId = generateImageId();
    const newImage: ProductImage = {
      id: imageId,
      url: urlInput.trim(),
      isMain: images.length === 0, // Первое изображение становится главным
      isUploading: false
    };

    onImagesChange([...images, newImage]);
    setUrlInput('');
    setShowUrlInput(false);
  };

  const handleGenerateImage = async () => {
    if (!generationPrompt.trim()) return;

    setIsGenerating(true);
    
    try {
      // Симулируем генерацию изображения
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Создаем placeholder изображение с текстом промпта
      const encodedPrompt = encodeURIComponent(generationPrompt.trim().slice(0, 50));
      const imageUrl = `https://via.placeholder.com/800x800/4F46E5/FFFFFF?text=${encodedPrompt}`;
      
      const imageId = generateImageId();
      const newImage: ProductImage = {
        id: imageId,
        url: imageUrl,
        isMain: images.length === 0,
        isUploading: false
      };

      onImagesChange([...images, newImage]);
      setGenerationPrompt('');
      setShowGenerateInput(false);
    } catch (error) {
      console.error('Ошибка генерации изображения:', error);
      alert('Произошла ошибка при генерации изображения. Попробуйте еще раз.');
    } finally {
      setIsGenerating(false);
    }
  };

  const removeImage = (imageId: string) => {
    const updatedImages = images.filter(img => img.id !== imageId);
    
    // Если удаляли главное изображение, делаем главным первое из оставшихся
    if (updatedImages.length > 0) {
      const hasMainImage = updatedImages.some(img => img.isMain);
      if (!hasMainImage) {
        updatedImages[0].isMain = true;
      }
    }
    
    onImagesChange(updatedImages);
  };

  const setMainImage = (imageId: string) => {
    const updatedImages = images.map(img => ({
      ...img,
      isMain: img.id === imageId
    }));
    onImagesChange(updatedImages);
  };

  const reorderImages = (dragIndex: number, hoverIndex: number) => {
    const dragImage = images[dragIndex];
    const updatedImages = [...images];
    updatedImages.splice(dragIndex, 1);
    updatedImages.splice(hoverIndex, 0, dragImage);
    onImagesChange(updatedImages);
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">
              Изображения товара ({images.length}/{maxImages})
            </Label>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                disabled={images.length >= maxImages}
              >
                <Icon name="Upload" size={16} className="mr-2" />
                Загрузить
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setShowUrlInput(!showUrlInput)}
                disabled={images.length >= maxImages}
              >
                <Icon name="Link" size={16} className="mr-2" />
                По URL
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setShowGenerateInput(!showGenerateInput)}
                disabled={images.length >= maxImages}
              >
                <Icon name="Sparkles" size={16} className="mr-2" />
                Генерировать
              </Button>
            </div>
          </div>

          {/* Скрытый input для загрузки файлов */}
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={(e) => handleFileUpload(e.target.files)}
          />

          {/* Добавление по URL */}
          {showUrlInput && (
            <Card className="border-dashed">
              <CardContent className="pt-4">
                <div className="space-y-3">
                  <Label htmlFor="imageUrl">URL изображения</Label>
                  <div className="flex gap-2">
                    <Input
                      id="imageUrl"
                      type="url"
                      value={urlInput}
                      onChange={(e) => setUrlInput(e.target.value)}
                      placeholder="https://example.com/image.jpg"
                      onKeyPress={(e) => e.key === 'Enter' && handleUrlAdd()}
                    />
                    <Button
                      type="button"
                      onClick={handleUrlAdd}
                      disabled={!urlInput.trim()}
                    >
                      Добавить
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Генерация изображения */}
          {showGenerateInput && (
            <Card className="border-dashed border-purple-200 bg-purple-50">
              <CardContent className="pt-4">
                <div className="space-y-3">
                  <Label htmlFor="generatePrompt">Описание изображения для генерации</Label>
                  <Textarea
                    id="generatePrompt"
                    value={generationPrompt}
                    onChange={(e) => setGenerationPrompt(e.target.value)}
                    placeholder="Например: современный офисный стул черного цвета на белом фоне"
                    rows={3}
                  />
                  <Button
                    type="button"
                    onClick={handleGenerateImage}
                    disabled={!generationPrompt.trim() || isGenerating}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    {isGenerating ? (
                      <>
                        <Icon name="Loader2" size={16} className="mr-2 animate-spin" />
                        Генерирую...
                      </>
                    ) : (
                      <>
                        <Icon name="Sparkles" size={16} className="mr-2" />
                        Сгенерировать изображение
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Галерея изображений */}
          {images.length > 0 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {images.map((image, index) => (
                  <div
                    key={image.id}
                    className={`relative group border-2 rounded-lg overflow-hidden transition-all ${
                      image.isMain 
                        ? 'border-emerald-600 ring-2 ring-emerald-200' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {/* Изображение */}
                    <div className="aspect-square relative">
                      <img
                        src={image.url || '/placeholder.svg'}
                        alt={`Фото ${index + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = '/placeholder.svg';
                        }}
                      />
                      
                      {/* Загрузка */}
                      {image.isUploading && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                          <Icon name="Loader2" size={24} className="text-white animate-spin" />
                        </div>
                      )}

                      {/* Кнопки управления */}
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all">
                        <div className="absolute top-2 right-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          {!image.isMain && (
                            <Button
                              type="button"
                              size="sm"
                              variant="secondary"
                              onClick={() => setMainImage(image.id)}
                              className="h-8 w-8 p-0 bg-white hover:bg-gray-100"
                              title="Сделать главным"
                            >
                              <Icon name="Star" size={14} />
                            </Button>
                          )}
                          <Button
                            type="button"
                            size="sm"
                            variant="destructive"
                            onClick={() => removeImage(image.id)}
                            className="h-8 w-8 p-0"
                            title="Удалить"
                          >
                            <Icon name="Trash2" size={14} />
                          </Button>
                        </div>
                      </div>

                      {/* Индикатор главного изображения */}
                      {image.isMain && (
                        <div className="absolute top-2 left-2">
                          <div className="bg-emerald-600 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                            <Icon name="Star" size={12} />
                            Главное
                          </div>
                        </div>
                      )}

                      {/* Номер изображения */}
                      <div className="absolute bottom-2 left-2">
                        <div className="bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
                          {index + 1}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Подсказки */}
              <div className="text-sm text-gray-600 space-y-1">
                <p>• <strong>Главное изображение</strong> отображается в карточке товара</p>
                <p>• Нажмите на <Icon name="Star" size={14} className="inline" /> чтобы сделать изображение главным</p>
                <p>• Поддерживаемые форматы: JPG, PNG, WebP</p>
                <p>• Рекомендуемый размер: 800x800 пикселей или больше</p>
              </div>
            </div>
          )}

          {/* Пустое состояние */}
          {images.length === 0 && (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
              <Icon name="ImagePlus" size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Добавьте изображения товара</h3>
              <p className="text-gray-600 mb-6">
                Загрузите фотографии товара, добавьте по URL или сгенерируйте с помощью ИИ
              </p>
              <div className="flex flex-col sm:flex-row gap-2 justify-center">
                <Button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-emerald-700 hover:bg-emerald-800"
                >
                  <Icon name="Upload" size={16} className="mr-2" />
                  Загрузить файлы
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowUrlInput(true)}
                >
                  <Icon name="Link" size={16} className="mr-2" />
                  Добавить по URL
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowGenerateInput(true)}
                  className="border-purple-300 text-purple-700 hover:bg-purple-50"
                >
                  <Icon name="Sparkles" size={16} className="mr-2" />
                  Генерировать ИИ
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductImageUploader;