import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Activity,
  ArrowUpRight,
  Bell,
  Building2,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Globe2,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquare,
  Moon,
  Plus,
  Search,
  Settings,
  Sparkles,
  Ticket,
  TrendingUp,
  Users,
  Wallet,
  X,
} from 'lucide-react'
import './App.css'

const sidebarItems = [
  { label: 'Dashboard', icon: LayoutDashboard, active: true },
  { label: 'Events', icon: CalendarDays },
  { label: 'Bookings', icon: Ticket },
  { label: 'Customers', icon: Users },
  { label: 'Venues', icon: Building2 },
  { label: 'Payments', icon: Wallet },
  { label: 'Analytics', icon: TrendingUp },
  { label: 'Messages', icon: MessageSquare },
  { label: 'Settings', icon: Settings },
]

const statCards = [
  { title: 'Total Events', value: '184', change: '+12.4%', icon: CalendarDays, tone: 'violet' },
  { title: 'Upcoming Events', value: '27', change: '+6.2%', icon: Sparkles, tone: 'cyan' },
  { title: 'Tickets Sold', value: '9.2K', change: '+18.9%', icon: Ticket, tone: 'emerald' },
  { title: 'Revenue', value: '$482K', change: '+24.3%', icon: Wallet, tone: 'amber' },
]

const events = [
  { name: 'Northstar Summit', organizer: 'Ava Chen', venue: 'Harbor Hall', date: '24 Jul', sold: '1,240', revenue: '$32K', status: 'Confirmed' },
  { name: 'Lumen Launch', organizer: 'Noah Reed', venue: 'Skyline Loft', date: '31 Jul', sold: '986', revenue: '$19.2K', status: 'Review' },
  { name: 'Aster Gala', organizer: 'Mina Patel', venue: 'Velora House', date: '04 Aug', sold: '842', revenue: '$17.4K', status: 'Live' },
]

const activities = [
  { title: 'New booking received', detail: 'Mina joined the Sapphire Gala waitlist', time: '2 min ago', color: 'cyan' },
  { title: 'Payment completed', detail: 'Invoice #4821 cleared for Northstar Summit', time: '14 min ago', color: 'emerald' },
  { title: 'Event published', detail: 'Harbor Hall launched a new premium package', time: '40 min ago', color: 'violet' },
]

function StatCard({ item }) {
  const Icon = item.icon
  return (
    <motion.article whileHover={{ y: -4, scale: 1.01 }} className={`stat-card ${item.tone}`}>
      <div className="stat-card__top">
        <div className="stat-icon">
          <Icon size={18} />
        </div>
        <span className="trend-pill">
          <ArrowUpRight size={14} />
          {item.change}
        </span>
      </div>
      <div className="stat-card__body">
        <p>{item.title}</p>
        <h3>{item.value}</h3>
      </div>
      <div className="sparkline" aria-hidden="true">
        <span></span><span></span><span></span><span></span><span></span>
      </div>
    </motion.article>
  )
}

function App() {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const currentDate = useMemo(() => new Date().toLocaleDateString('en', { weekday: 'long', month: 'short', day: 'numeric' }), [])

  return (
    <div className="dashboard-shell">
      <div className="background-orb orb-one" />
      <div className="background-orb orb-two" />
      <div className="background-grid" />

      <aside className={`sidebar ${collapsed ? 'collapsed' : ''} ${mobileOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar__header">
          <div className="brand-mark">
            <Sparkles size={18} />
          </div>
          {!collapsed && (
            <div>
              <p className="eyebrow">Signal Studio</p>
              <h2>VenueOS</h2>
            </div>
          )}
          <button className="icon-button ghost" onClick={() => setCollapsed((value) => !value)} aria-label="Collapse sidebar">
            {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>

        <nav className="sidebar__nav" aria-label="Primary">
          {sidebarItems.map((item) => {
            const Icon = item.icon
            return (
              <button key={item.label} className={`nav-item ${item.active ? 'active' : ''}`} type="button">
                <Icon size={18} />
                {!collapsed && <span>{item.label}</span>}
              </button>
            )
          })}
        </nav>

        <div className="sidebar__footer">
          <button className="nav-item logout" type="button">
            <LogOut size={18} />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

      <div className="main-panel">
        <header className="topbar">
          <div className="topbar__left">
            <button className="icon-button mobile-only" onClick={() => setMobileOpen(true)} aria-label="Open navigation">
              <Menu size={18} />
            </button>
            <div>
              <p className="eyebrow">Operations Center</p>
              <h1>Event Management Dashboard</h1>
            </div>
          </div>

          <div className="topbar__right">
            <label className="searchbar" htmlFor="global-search">
              <Search size={16} />
              <input id="global-search" placeholder="Search events, bookings...” />
            </label>
            <button className="icon-button" aria-label="Toggle notifications" onClick={() => setNotificationsOpen((value) => !value)}>
              <Bell size={18} />
              <span className="status-dot" />
            </button>
            <button className="icon-button" aria-label="Toggle theme">
              <Moon size={18} />
            </button>
            <button className="icon-button" aria-label="Select language">
              <Globe2 size={18} />
            </button>
            <div className="user-chip">
              <div className="avatar">AL</div>
              <div>
                <strong>Alicia Lane</strong>
                <p>{currentDate}</p>
              </div>
            </div>
          </div>
        </header>

        <main className="dashboard-content">
          <section className="hero-card">
            <div>
              <p className="eyebrow">Live performance</p>
              <h2>High-intent growth across every event channel.</h2>
              <p className="hero-copy">Monitor ticket momentum, attendance quality, and premium bookings from a single intelligent workspace.</p>
              <div className="hero-actions">
                <button className="primary-btn" type="button">Create Event</button>
                <button className="secondary-btn" type="button">Export Data</button>
              </div>
            </div>
            <div className="hero-summary">
              <div>
                <span>Conversion</span>
                <strong>8.4%</strong>
              </div>
              <div>
                <span>Returning</span>
                <strong>73%</strong>
              </div>
              <div>
                <span>Avg. Attendance</span>
                <strong>91%</strong>
              </div>
            </div>
          </section>

          <section className="stats-grid" aria-label="Key metrics">
            {statCards.map((item) => (
              <StatCard key={item.title} item={item} />
            ))}
          </section>

          <section className="charts-grid">
            <motion.article whileHover={{ y: -3 }} className="panel chart-card large">
              <div className="panel__header">
                <div>
                  <p className="eyebrow">Revenue</p>
                  <h3>Monthly performance</h3>
                </div>
                <button className="text-btn" type="button">Export</button>
              </div>
              <div className="chart-area">
                <svg viewBox="0 0 320 170" role="img" aria-label="Revenue area chart">
                  <defs>
                    <linearGradient id="revenueFill" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#6366F1" stopOpacity="0.5" />
                      <stop offset="100%" stopColor="#6366F1" stopOpacity="0.02" />
                    </linearGradient>
                  </defs>
                  <path d="M0 132 C25 122 42 116 60 104 C80 90 100 78 120 84 C142 90 155 114 180 112 C210 110 222 76 246 70 C266 65 300 70 320 48 L320 170 L0 170 Z" fill="url(#revenueFill)" />
                  <path d="M0 132 C25 122 42 116 60 104 C80 90 100 78 120 84 C142 90 155 114 180 112 C210 110 222 76 246 70 C266 65 300 70 320 48" stroke="#8B5CF6" strokeWidth="3" fill="none" />
                </svg>
                <div className="chart-labels">
                  <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
                </div>
              </div>
            </motion.article>

            <motion.article whileHover={{ y: -3 }} className="panel chart-card">
              <div className="panel__header">
                <div>
                  <p className="eyebrow">Tickets</p>
                  <h3>Weekly sales</h3>
                </div>
              </div>
              <div className="bar-chart" aria-label="Ticket bar chart">
                {[40, 72, 58, 90, 76, 96].map((height, index) => (
                  <div key={index} className="bar-pill">
                    <div style={{ height: `${height}%` }} />
                  </div>
                ))}
              </div>
            </motion.article>

            <motion.article whileHover={{ y: -3 }} className="panel chart-card">
              <div className="panel__header">
                <div>
                  <p className="eyebrow">Categories</p>
                  <h3>Top event mix</h3>
                </div>
              </div>
              <div className="donut-chart" aria-label="Event category chart">
                <div className="donut-ring">
                  <div className="donut-center">
                    <strong>42%</strong>
                    <span>Premium</span>
                  </div>
                </div>
                <ul className="legend-list">
                  <li><span className="dot violet" /> Premium</li>
                  <li><span className="dot cyan" /> Community</li>
                  <li><span className="dot emerald" /> Experiential</li>
                </ul>
              </div>
            </motion.article>

            <motion.article whileHover={{ y: -3 }} className="panel chart-card">
              <div className="panel__header">
                <div>
                  <p className="eyebrow">Attendance</p>
                  <h3>Guest turnout</h3>
                </div>
              </div>
              <div className="stacked-chart" aria-label="Attendance stacked chart">
                {[58, 74, 67, 82].map((value, index) => (
                  <div key={index} className="stacked-column">
                    <div className="stacked-segment top" style={{ height: `${value}%` }} />
                    <div className="stacked-segment bottom" style={{ height: `${Math.max(18, 100 - value)}%` }} />
                  </div>
                ))}
              </div>
            </motion.article>
          </section>

          <section className="lower-grid">
            <motion.article whileHover={{ y: -3 }} className="panel table-card">
              <div className="panel__header">
                <div>
                  <p className="eyebrow">Operations</p>
                  <h3>Recent events</h3>
                </div>
                <button className="text-btn" type="button">Filter</button>
              </div>
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>Event</th>
                      <th>Organizer</th>
                      <th>Venue</th>
                      <th>Date</th>
                      <th>Sold</th>
                      <th>Revenue</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {events.map((event) => (
                      <tr key={event.name}>
                        <td>{event.name}</td>
                        <td>{event.organizer}</td>
                        <td>{event.venue}</td>
                        <td>{event.date}</td>
                        <td>{event.sold}</td>
                        <td>{event.revenue}</td>
                        <td>
                          <span className={`badge ${event.status.toLowerCase()}`}>{event.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.article>

            <div className="side-stack">
              <motion.article whileHover={{ y: -3 }} className="panel timeline-card">
                <div className="panel__header">
                  <div>
                    <p className="eyebrow">Activity</p>
                    <h3>Live timeline</h3>
                  </div>
                  <button className="text-btn" type="button">View all</button>
                </div>
                <ul className="timeline-list">
                  {activities.map((activity) => (
                    <li key={activity.title}>
                      <span className={`timeline-dot ${activity.color}`} />
                      <div>
                        <strong>{activity.title}</strong>
                        <p>{activity.detail}</p>
                        <small>{activity.time}</small>
                      </div>
                    </li>
                  ))}
                </ul>
              </motion.article>

              <motion.article whileHover={{ y: -3 }} className="panel quick-card">
                <div className="panel__header">
                  <div>
                    <p className="eyebrow">Quick actions</p>
                    <h3>Launch faster</h3>
                  </div>
                </div>
                <div className="quick-actions">
                  <button type="button"><Plus size={16} /> Create Event</button>
                  <button type="button"><Building2 size={16} /> Add Venue</button>
                  <button type="button"><TrendingUp size={16} /> Generate Report</button>
                </div>
              </motion.article>
            </div>
          </section>
        </main>
      </div>

      <AnimatePresence>
        {notificationsOpen && (
          <motion.aside initial={{ x: 320, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 320, opacity: 0 }} transition={{ duration: 0.25 }} className="notifications-panel">
            <div className="panel__header">
              <div>
                <p className="eyebrow">Inbox</p>
                <h3>Notifications</h3>
              </div>
              <button className="icon-button" onClick={() => setNotificationsOpen(false)} aria-label="Close notifications">
                <X size={18} />
              </button>
            </div>
            <div className="notification-list">
              <div className="notification-item">
                <strong>Bookings</strong>
                <p>3 high-value requests need review.</p>
              </div>
              <div className="notification-item">
                <strong>Payments</strong>
                <p>Invoice settlement for Harbor Hall is pending.</p>
              </div>
              <div className="notification-item">
                <strong>System</strong>
                <p>New analytics sync completed successfully.</p>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mobile-scrim" onClick={() => setMobileOpen(false)} />
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
