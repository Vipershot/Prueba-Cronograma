import React from 'react';

const MainLayout = ({ header, configPanel, alerts, schedule, footer }) => {
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="w-full mb-6 md:mb-10">
        {header}
      </div>

      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
          <div className="lg:col-span-1 space-y-6 md:space-y-8">
            <div className="sticky top-6">
              {configPanel}
              {alerts && (
                <div className="mt-6 space-y-4 md:space-y-6">
                  {alerts}
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-2">
            {schedule}
          </div>
        </div>

        <div className="w-full mt-8 md:mt-12 pt-6 md:pt-8 border-t border-gray-200">
          {footer}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
