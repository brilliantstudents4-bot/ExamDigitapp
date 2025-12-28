
import React, { useRef, useState } from 'react';
import { Upload, Image as ImageIcon, X, Camera } from 'lucide-react';
import { FileData } from '../types';

interface ImageUploaderProps {
  onImageSelected: (data: FileData | null) => void;
  disabled?: boolean;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelected, disabled }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = (reader.result as string).split(',')[1];
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
      onImageSelected({
        base64: base64String,
        mimeType: file.type,
        previewUrl: previewUrl
      });
    };
    reader.readAsDataURL(file);
  };

  const clearImage = () => {
    setPreview(null);
    onImageSelected(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="w-full">
      {!preview ? (
        <div 
          onClick={() => !disabled && fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-2xl p-8 transition-all flex flex-col items-center justify-center cursor-pointer 
            ${disabled ? 'bg-gray-100 border-gray-300 cursor-not-allowed' : 'bg-white border-blue-200 hover:border-blue-400 hover:bg-blue-50'}`}
        >
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            accept="image/*" 
            onChange={handleFileChange}
            disabled={disabled}
          />
          <div className="bg-blue-100 p-4 rounded-full text-blue-600 mb-4">
            <Upload size={32} />
          </div>
          <h3 className="text-lg font-bold text-gray-800 mb-2">ارفع صورة نموذج الاختبار</h3>
          <p className="text-gray-500 text-sm text-center mb-4">
            اسحب الصورة هنا أو انقر للاختيار من جهازك<br/>
            (يدعم صور الجوال والمسح الضوئي)
          </p>
          <div className="flex gap-4">
             <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors">
               <ImageIcon size={18} />
               اختر صورة
             </button>
             <button 
               className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-200 transition-colors"
               onClick={(e) => {
                 e.stopPropagation();
                 fileInputRef.current?.setAttribute('capture', 'environment');
                 fileInputRef.current?.click();
               }}
             >
               <Camera size={18} />
               التقط صورة
             </button>
          </div>
        </div>
      ) : (
        <div className="relative rounded-2xl overflow-hidden border border-gray-200 shadow-sm bg-black group">
          <img 
            src={preview} 
            alt="Exam Preview" 
            className="max-h-[500px] w-full object-contain mx-auto" 
          />
          <button 
            onClick={clearImage}
            disabled={disabled}
            className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-full shadow-lg hover:bg-red-600 transition-colors disabled:opacity-50"
          >
            <X size={20} />
          </button>
          <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-3 text-sm flex justify-between items-center backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
            <span>تم تحميل الصورة بنجاح</span>
            <button 
              onClick={() => !disabled && fileInputRef.current?.click()}
              className="underline hover:text-blue-300 font-medium"
            >
              تغيير الصورة
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
