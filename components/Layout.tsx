
import React from 'react';
import { BookOpen, HelpCircle } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="bg-blue-600 p-2 rounded-lg text-white">
                <BookOpen size={24} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 leading-none">ExamDigit</h1>
                <p className="text-xs text-blue-600 font-medium mt-1">المستخرج الذكي للاختبارات</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <a href="#" className="text-sm font-medium text-gray-600 hover:text-blue-600">الرئيسية</a>
              <a href="#" className="text-sm font-medium text-gray-600 hover:text-blue-600">عن الخدمة</a>
              <button className="flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-blue-600">
                <HelpCircle size={18} />
                مساعدة
              </button>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} ExamDigit. جميع الحقوق محفوظة للمعلمين والطلاب.
          </p>
          <p className="text-xs text-gray-400 mt-2">
            مدعوم بتقنيات الذكاء الاصطناعي المتقدمة لتحليل النصوص.
          </p>
        </div>
      </footer>
    </div>
  );
};
