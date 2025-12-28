
import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { ImageUploader } from './components/ImageUploader';
import { OCRResultDisplay } from './components/OCRResultDisplay';
import { performOCR } from './services/geminiService';
import { FileData } from './types';
// Added FileText to the imports from lucide-react to fix reference error
import { Zap, Loader2, AlertCircle, Sparkles, FileSearch, CheckCircle2, FileText } from 'lucide-react';

const App: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<FileData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [resultText, setResultText] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleStartOCR = async () => {
    if (!selectedFile) return;

    setIsLoading(true);
    setError(null);
    setResultText(null);

    const result = await performOCR(selectedFile.base64, selectedFile.mimeType);

    if (result.success) {
      setResultText(result.text);
    } else {
      setError(result.error || 'فشل استخراج النص.');
    }
    setIsLoading(false);
  };

  const handleReset = () => {
    setSelectedFile(null);
    setResultText(null);
    setError(null);
  };

  return (
    <Layout>
      <div className="bg-gradient-to-b from-blue-50 to-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-bold mb-6">
            <Sparkles size={16} />
            بتقنية الذكاء الاصطناعي الأحدث
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
            حول صور اختباراتك إلى نصوص <span className="text-blue-600">بلمحة بصر</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            أداة متخصصة للمعلمين والطلاب لاستخراج نصوص الاختبارات المدرسية باللغة العربية مع الحفاظ الكامل على التنسيق، الترتيب، والفقرات بدقة تامة.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Input Section */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-xl shadow-blue-900/5">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold">1</div>
                <h3 className="text-xl font-bold text-gray-800">تحميل الصورة</h3>
              </div>
              
              <ImageUploader 
                onImageSelected={setSelectedFile} 
                disabled={isLoading} 
              />

              <div className="mt-8">
                <button
                  onClick={handleStartOCR}
                  disabled={!selectedFile || isLoading}
                  className={`w-full py-4 rounded-2xl flex items-center justify-center gap-3 text-lg font-bold transition-all shadow-lg
                    ${!selectedFile || isLoading 
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none' 
                      : 'bg-blue-600 text-white hover:bg-blue-700 hover:scale-[1.02] active:scale-[0.98] shadow-blue-200'}`}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="animate-spin" />
                      جاري التحليل بدقة...
                    </>
                  ) : (
                    <>
                      <Zap size={20} fill="currentColor" />
                      استخراج النص الآن
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               <div className="bg-white p-4 rounded-2xl border border-gray-100 flex items-start gap-3">
                 <div className="text-green-500"><CheckCircle2 size={24} /></div>
                 <div>
                   <h4 className="font-bold text-sm text-gray-800">دقة 100%</h4>
                   <p className="text-xs text-gray-500">تحليل دقيق لكل حرف وعلامة ترقيم</p>
                 </div>
               </div>
               <div className="bg-white p-4 rounded-2xl border border-gray-100 flex items-start gap-3">
                 <div className="text-blue-500"><FileSearch size={24} /></div>
                 <div>
                   <h4 className="font-bold text-sm text-gray-800">حفظ التنسيق</h4>
                   <p className="text-xs text-gray-500">الحفاظ على ترتيب الأسئلة والفقرات</p>
                 </div>
               </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="lg:sticky lg:top-24 h-full min-h-[500px]">
            {isLoading ? (
              <div className="bg-white h-[600px] rounded-3xl border border-gray-200 flex flex-col items-center justify-center p-8 text-center animate-pulse">
                <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center text-blue-500 mb-6">
                  <Loader2 size={40} className="animate-spin" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">جاري استخراج البيانات...</h3>
                <p className="text-gray-500">نقوم الآن بتحليل هيكلية الاختبار وتنسيق الفقرات لضمان نتيجة مطابقة للأصل.</p>
                <div className="mt-8 w-full max-w-xs h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 animate-[loading_2s_ease-in-out_infinite]"></div>
                </div>
              </div>
            ) : resultText ? (
              <div className="h-[600px] flex flex-col">
                 <OCRResultDisplay text={resultText} />
                 <button 
                  onClick={handleReset}
                  className="mt-4 text-blue-600 font-bold hover:underline self-center"
                 >
                   البدء من جديد
                 </button>
              </div>
            ) : error ? (
              <div className="bg-red-50 h-[500px] rounded-3xl border border-red-100 flex flex-col items-center justify-center p-8 text-center">
                <AlertCircle size={48} className="text-red-500 mb-4" />
                <h3 className="text-xl font-bold text-red-800 mb-2">عذراً، حدث خطأ</h3>
                <p className="text-red-600 mb-6">{error}</p>
                <button 
                  onClick={handleStartOCR}
                  className="bg-white border border-red-200 text-red-700 px-6 py-2 rounded-xl font-bold hover:bg-red-100 transition-colors"
                >
                  إعادة المحاولة
                </button>
              </div>
            ) : (
              <div className="bg-gray-100/50 h-[600px] rounded-3xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center p-8 text-center">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-gray-400 mb-4">
                  <FileText size={32} />
                </div>
                <h3 className="text-lg font-bold text-gray-400">ستظهر النتائج هنا</h3>
                <p className="text-sm text-gray-400 mt-2">قم برفع صورة الاختبار واضغط على زر "استخراج النص" للبدء</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes loading {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
      `}</style>
    </Layout>
  );
};

export default App;
