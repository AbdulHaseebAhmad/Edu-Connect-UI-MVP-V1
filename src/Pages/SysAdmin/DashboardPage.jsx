import 'font-awesome/css/font-awesome.min.css';

export default function DashboardPage() {
  return (
    <section className="flex-2/2 p-6 overflow-y-auto">
      
          <h2 className="text-2xl font-semibold flex items-center gap-2 mb-6">
            <i className="fa fa-tachometer" /> System Dashboard
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              ["fa-school", "342", "Active Schools", "bg-blue-100 text-blue-600"],
              ["fa-user-graduate", "185,742", "Registered Students", "bg-purple-100 text-purple-600"],
              ["fa-chalkboard-teacher", "8,923", "Teachers", "bg-green-100 text-green-600"],
              ["fa-sync", "98.7%", "System Uptime", "bg-blue-100 text-blue-600"],
            ].map(([icon, num, label, iconStyle]) => (
              <div
                key={label}
                className="bg-white rounded-lg shadow p-4 flex items-center gap-4 hover:-translate-y-1 transition"
              >
                <div className={`${iconStyle} w-14 h-14 flex items-center justify-center text-xl rounded-lg`}>
                  <i className={`fa ${icon}`} />
                </div>
                <div>
                  <h3 className="text-xl font-bold">{num}</h3>
                  <p className="text-gray-500">{label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {[
                ["fa-plus-circle", "Add School", "Register new institution"],
                ["fa-sync", "Sync Data", "Update all platforms"],
                ["fa-file-export", "Generate Report", "Create system report"],
                ["fa-plug", "Integrations", "Connect 3rd party apps"],
                ["fa-tools", "System Tools", "Maintenance utilities"],
              ].map(([icon, title, desc]) => (
                <div
                  key={title}
                  className="bg-white rounded-lg shadow p-6 text-center cursor-pointer hover:-translate-y-1 hover:bg-blue-600 hover:text-white transition"
                >
                  <i className={`fa ${icon} text-3xl text-blue-600 mb-3`} />
                  <h3 className="font-semibold">{title}</h3>
                  <p className="text-sm text-gray-500">{desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Recent System Activity</h3>
              <button className="border border-gray-400 px-4 py-1 rounded-md text-sm">View All</button>
            </div>
            <div className="divide-y">
              {[
                ["fa-sync-alt", "Data Sync Completed", "Platforms synchronized successfully", "10 minutes ago", "bg-green-100 text-green-600"],
                ["fa-school", "New School Added", "Lincoln High School registered", "1 hour ago", "bg-green-100 text-green-600"],
                ["fa-user-plus", "Batch Enrollment", "325 students added to Oakridge Academy", "3 hours ago", "bg-blue-100 text-blue-600"],
                ["fa-exclamation-triangle", "Performance Alert", "API response time increased by 25%", "Yesterday", "bg-yellow-100 text-yellow-600"],
              ].map(([icon, title, desc, time, style]) => (
                <div key={title} className="flex items-start gap-3 py-3">
                  <div className={`${style} w-10 h-10 flex items-center justify-center rounded-full`}>
                    <i className={`fa ${icon}`} />
                  </div>
                  <div>
                    <h4 className="font-semibold">{title}</h4>
                    <p className="text-gray-500 text-sm">{desc}</p>
                    <span className="text-gray-400 text-xs">{time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
  )
}
