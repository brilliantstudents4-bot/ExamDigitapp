
import React, { useState } from 'react';
import { Copy, Check, Download, FileText, Share2 } from 'lucide-react';

interface OCRResultDisplayProps {
  text: string;
}

export const OCRResultDisplay: React.FC<OCRResultDisplayProps> = ({ text }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `exam_extracted_${new Date().getTime()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col h-full">
      <div className="bg-gray-50 border-b border-gray-200 p-4 flex justify-between items-center">
        <div className="flex items-center gap-2 text-gray-700">
          <FileText size={20} className="text-blue-600" />
          <span className="font-bold">النص المستخرج</span>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={handleCopy}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${copied ? 'bg-green-100 text-green-700' : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'}`}
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            {copied ? 'تم النسخ' : 'نسخ النص'}
          </button>
          <button 
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-all"
          >
            <Download size={16} />
            تحميل
          </button>
        </div>
      </div>
      <div className="p-6 overflow-auto flex-grow bg-white whitespace-pre-wrap font-mono text-sm leading-relaxed text-right" dir="rtl">
        <div className="markdown-content">
          {text}
        </div>
      </div>
      <div className="bg-blue-50 p-3 text-center border-t border-blue-100">
        <p className="text-xs text-blue-700 font-medium">
          تم الحفاظ على التنسيق والفقرات بدقة عالية. يمكنك استخدامه في الوورد أو ملفات PDF.
        </p>
      </div>
    </div>
  );
};
