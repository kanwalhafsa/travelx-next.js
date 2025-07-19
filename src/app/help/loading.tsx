export default function HelpLoading() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="animate-pulse">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-6"></div>
            <div className="h-8 bg-gray-300 rounded w-1/3 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto mb-8"></div>
            <div className="max-w-2xl mx-auto">
              <div className="h-12 bg-gray-300 rounded"></div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg p-6">
                <div className="w-12 h-12 bg-gray-300 rounded-full mx-auto mb-4"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto mb-2"></div>
                <div className="h-3 bg-gray-300 rounded w-3/4 mx-auto mb-4"></div>
                <div className="h-8 bg-gray-300 rounded w-1/2 mx-auto"></div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg p-6 mb-6">
                <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
                <div className="space-y-3">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-10 bg-gray-300 rounded"></div>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-lg p-6">
                <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
                <div className="space-y-2">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-4 bg-gray-300 rounded"></div>
                  ))}
                </div>
              </div>
            </div>

            {/* Articles */}
            <div className="lg:col-span-3">
              <div className="mb-6">
                <div className="h-8 bg-gray-300 rounded w-1/3 mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
              </div>
              <div className="space-y-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white rounded-lg p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <div className="h-5 bg-gray-300 rounded w-16"></div>
                          <div className="h-4 bg-gray-300 rounded w-12"></div>
                        </div>
                        <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
                        <div className="h-4 bg-gray-300 rounded w-full mb-3"></div>
                        <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                      </div>
                      <div className="w-5 h-5 bg-gray-300 rounded ml-4"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
