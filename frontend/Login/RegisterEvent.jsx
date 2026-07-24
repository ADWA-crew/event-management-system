import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../src/index.css';
import './register.css';

const CATEGORIES = [
  { id: 'conference', label: 'Conference', icon: '🎙️' },
  { id: 'concert', label: 'Concert', icon: '🎵' },
  { id: 'workshop', label: 'Workshop', icon: '🛠️' },
  { id: 'networking', label: 'Networking', icon: '🤝' },
  { id: 'exhibition', label: 'Exhibition', icon: '🖼️' },
  { id: 'sports', label: 'Sports', icon: '⚽' },
  { id: 'festival', label: 'Festival', icon: '🎉' },
  { id: 'webinar', label: 'Webinar', icon: '💻' },
];

const TICKET_TYPES = ['Free', 'Paid', 'Invite Only'];

const STEPS = ['Details', 'Location & Time', 'Tickets', 'Review'];

export default function RegisterEventPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    title: '',
    category: '',
    description: '',
    venue: '',
    city: '',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    ticketType: 'Free',
    ticketPrice: '',
    capacity: '',
    coverImage: '',
    tags: '',
    isOnline: false,
  });

  const set = (key, val) => setForm((prev) => ({ ...prev, [key]: val }));

  const validateStep = () => {
    if (step === 0) {
      if (!form.title.trim()) return 'Event title is required.';
      if (!form.category) return 'Please select a category.';
      if (!form.description.trim()) return 'Please add a description.';
    }
    if (step === 1) {
      if (!form.isOnline && !form.venue.trim()) return 'Venue is required for in-person events.';
      if (!form.startDate) return 'Start date is required.';
      if (!form.startTime) return 'Start time is required.';
      if (!form.endDate) return 'End date is required.';
    }
    if (step === 2) {
      if (form.ticketType === 'Paid' && !form.ticketPrice) return 'Please enter a ticket price.';
      if (!form.capacity) return 'Event capacity is required.';
    }
    return '';
  };

  const nextStep = () => {
    const err = validateStep();
    if (err) { setError(err); return; }
    setError('');
    setStep((s) => Math.min(s + 1, 3));
  };

  const prevStep = () => {
    setError('');
    setStep((s) => Math.max(s - 1, 0));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      // Simulate API call
      await new Promise((res) => setTimeout(res, 1800));
      setSubmitted(true);
    } catch {
      setError('Failed to register event. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="reg-page-container">
        <div className="bg-glow bg-glow-1"></div>
        <div className="bg-glow bg-glow-2"></div>
        <div className="success-card animate-fade-in">
          <div className="success-icon-ring">
            <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <h2 className="success-title">Event Registered!</h2>
          <p className="success-subtitle">
            <strong>{form.title}</strong> has been successfully submitted for review. It will go live shortly.
          </p>
          <div className="success-meta">
            <span>📅 {form.startDate} at {form.startTime}</span>
            <span>📍 {form.isOnline ? 'Online Event' : form.venue}</span>
            <span>🎟️ {form.ticketType} · {form.capacity} capacity</span>
          </div>
          <div className="success-actions">
            <button className="submit-btn" style={{ maxWidth: '200px' }} onClick={() => navigate('/dashboard')}>
              Go to Dashboard
            </button>
            <button
              className="ghost-btn"
              onClick={() => { setSubmitted(false); setStep(0); setForm({ title:'', category:'', description:'', venue:'', city:'', startDate:'', startTime:'', endDate:'', endTime:'', ticketType:'Free', ticketPrice:'', capacity:'', coverImage:'', tags:'', isOnline:false }); }}
            >
              Register Another
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="reg-page-container">
      <div className="bg-glow bg-glow-1"></div>
      <div className="bg-glow bg-glow-2"></div>

      <div className="reg-card animate-fade-in">
        {/* ── Header ── */}
        <div className="reg-header">
          <button className="back-nav-btn" onClick={() => navigate('/dashboard')}>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            Dashboard
          </button>
          <div className="reg-title-block">
            <span className="reg-badge">New Event</span>
            <h1 className="reg-main-title">Register Your Event</h1>
            <p className="reg-subtitle">Fill in the details below to list your event on EventHub</p>
          </div>
        </div>

        {/* ── Stepper ── */}
        <div className="stepper">
          {STEPS.map((label, i) => (
            <React.Fragment key={label}>
              <div className={`step-item ${i === step ? 'active' : ''} ${i < step ? 'done' : ''}`}>
                <div className="step-circle">
                  {i < step ? (
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  ) : (
                    <span>{i + 1}</span>
                  )}
                </div>
                <span className="step-label">{label}</span>
              </div>
              {i < STEPS.length - 1 && <div className={`step-connector ${i < step ? 'done' : ''}`}></div>}
            </React.Fragment>
          ))}
        </div>

        {/* ── Error Alert ── */}
        {error && (
          <div className="error-alert" style={{ marginBottom: '1.5rem' }}>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
            </svg>
            <span>{error}</span>
          </div>
        )}

        {/* ─────────────────────────────────────────────
            STEP 0 — DETAILS
        ───────────────────────────────────────────── */}
        {step === 0 && (
          <div className="reg-form-section animate-fade-in">
            {/* Event Title */}
            <div className="input-group">
              <label className="input-label">Event Title <span className="required">*</span></label>
              <div className="input-wrapper">
                <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. TechSummit 2026"
                  value={form.title}
                  onChange={(e) => set('title', e.target.value)}
                  maxLength={80}
                />
              </div>
              <span className="char-counter">{form.title.length}/80</span>
            </div>

            {/* Category Grid */}
            <div className="input-group">
              <label className="input-label">Category <span className="required">*</span></label>
              <div className="category-grid">
                {CATEGORIES.map((cat) => (
                  <button
                    type="button"
                    key={cat.id}
                    className={`category-chip ${form.category === cat.id ? 'selected' : ''}`}
                    onClick={() => set('category', cat.id)}
                  >
                    <span className="cat-icon">{cat.icon}</span>
                    <span>{cat.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="input-group">
              <label className="input-label">Description <span className="required">*</span></label>
              <textarea
                className="form-input textarea"
                placeholder="Tell attendees what your event is about, who should attend, and what they'll experience..."
                value={form.description}
                onChange={(e) => set('description', e.target.value)}
                rows={4}
                maxLength={1000}
              />
              <span className="char-counter">{form.description.length}/1000</span>
            </div>

            {/* Tags */}
            <div className="input-group">
              <label className="input-label">Tags <span className="optional">(optional)</span></label>
              <div className="input-wrapper">
                <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                  <line x1="7" y1="7" x2="7.01" y2="7"></line>
                </svg>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. technology, innovation, startup"
                  value={form.tags}
                  onChange={(e) => set('tags', e.target.value)}
                />
              </div>
              <span className="field-hint">Separate tags with commas</span>
            </div>
          </div>
        )}

        {/* ─────────────────────────────────────────────
            STEP 1 — LOCATION & TIME
        ───────────────────────────────────────────── */}
        {step === 1 && (
          <div className="reg-form-section animate-fade-in">
            {/* Online Toggle */}
            <div className="toggle-row">
              <div className="toggle-info">
                <span className="toggle-title">Online Event</span>
                <span className="toggle-desc">This event will be hosted virtually</span>
              </div>
              <button
                type="button"
                className={`toggle-switch ${form.isOnline ? 'on' : ''}`}
                onClick={() => set('isOnline', !form.isOnline)}
                aria-label="Toggle online event"
              >
                <span className="toggle-knob"></span>
              </button>
            </div>

            {/* Venue */}
            {!form.isOnline && (
              <div className="input-group">
                <label className="input-label">Venue Name <span className="required">*</span></label>
                <div className="input-wrapper">
                  <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                  </svg>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Millennium Hall, Addis Ababa"
                    value={form.venue}
                    onChange={(e) => set('venue', e.target.value)}
                  />
                </div>
              </div>
            )}

            {/* City */}
            {!form.isOnline && (
              <div className="input-group">
                <label className="input-label">City / Country</label>
                <div className="input-wrapper">
                  <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="10" r="3"></circle>
                    <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 14 8 14s8-8.75 8-14a8 8 0 0 0-8-8z"></path>
                  </svg>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Addis Ababa, Ethiopia"
                    value={form.city}
                    onChange={(e) => set('city', e.target.value)}
                  />
                </div>
              </div>
            )}

            {/* Date & Time row */}
            <div className="two-col">
              <div className="input-group">
                <label className="input-label">Start Date <span className="required">*</span></label>
                <div className="input-wrapper">
                  <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                  <input
                    type="date"
                    className="form-input"
                    value={form.startDate}
                    onChange={(e) => set('startDate', e.target.value)}
                  />
                </div>
              </div>
              <div className="input-group">
                <label className="input-label">Start Time <span className="required">*</span></label>
                <div className="input-wrapper">
                  <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                  <input
                    type="time"
                    className="form-input"
                    value={form.startTime}
                    onChange={(e) => set('startTime', e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="two-col">
              <div className="input-group">
                <label className="input-label">End Date <span className="required">*</span></label>
                <div className="input-wrapper">
                  <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                  <input
                    type="date"
                    className="form-input"
                    value={form.endDate}
                    onChange={(e) => set('endDate', e.target.value)}
                  />
                </div>
              </div>
              <div className="input-group">
                <label className="input-label">End Time</label>
                <div className="input-wrapper">
                  <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                  <input
                    type="time"
                    className="form-input"
                    value={form.endTime}
                    onChange={(e) => set('endTime', e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ─────────────────────────────────────────────
            STEP 2 — TICKETS
        ───────────────────────────────────────────── */}
        {step === 2 && (
          <div className="reg-form-section animate-fade-in">
            {/* Ticket Type */}
            <div className="input-group">
              <label className="input-label">Ticket Type <span className="required">*</span></label>
              <div className="ticket-type-row">
                {TICKET_TYPES.map((t) => (
                  <button
                    type="button"
                    key={t}
                    className={`ticket-type-btn ${form.ticketType === t ? 'selected' : ''}`}
                    onClick={() => set('ticketType', t)}
                  >
                    <span className="ticket-icon">
                      {t === 'Free' ? '🎟️' : t === 'Paid' ? '💳' : '📩'}
                    </span>
                    <span>{t}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Ticket Price (only for Paid) */}
            {form.ticketType === 'Paid' && (
              <div className="input-group">
                <label className="input-label">Ticket Price (USD) <span className="required">*</span></label>
                <div className="input-wrapper">
                  <span className="currency-prefix">$</span>
                  <input
                    type="number"
                    className="form-input"
                    style={{ paddingLeft: '2.5rem' }}
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    value={form.ticketPrice}
                    onChange={(e) => set('ticketPrice', e.target.value)}
                  />
                </div>
              </div>
            )}

            {/* Capacity */}
            <div className="input-group">
              <label className="input-label">Event Capacity <span className="required">*</span></label>
              <div className="input-wrapper">
                <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
                <input
                  type="number"
                  className="form-input"
                  placeholder="e.g. 500"
                  min="1"
                  value={form.capacity}
                  onChange={(e) => set('capacity', e.target.value)}
                />
              </div>
            </div>

            {/* Cover Image URL */}
            <div className="input-group">
              <label className="input-label">Cover Image URL <span className="optional">(optional)</span></label>
              <div className="input-wrapper">
                <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <circle cx="8.5" cy="8.5" r="1.5"></circle>
                  <polyline points="21 15 16 10 5 21"></polyline>
                </svg>
                <input
                  type="url"
                  className="form-input"
                  placeholder="https://example.com/cover.jpg"
                  value={form.coverImage}
                  onChange={(e) => set('coverImage', e.target.value)}
                />
              </div>
              {form.coverImage && (
                <div className="image-preview">
                  <img src={form.coverImage} alt="cover preview" onError={(e) => { e.target.style.display = 'none'; }} />
                </div>
              )}
            </div>
          </div>
        )}

        {/* ─────────────────────────────────────────────
            STEP 3 — REVIEW
        ───────────────────────────────────────────── */}
        {step === 3 && (
          <div className="reg-form-section animate-fade-in">
            <div className="review-section-title">Review your event before submitting</div>

            <div className="review-grid">
              <div className="review-card">
                <div className="review-label">📋 Event</div>
                <div className="review-value main">{form.title}</div>
                <div className="review-value dim">{CATEGORIES.find(c => c.id === form.category)?.icon} {CATEGORIES.find(c => c.id === form.category)?.label}</div>
                {form.tags && <div className="review-tags">{form.tags.split(',').map(t => <span key={t} className="review-tag">{t.trim()}</span>)}</div>}
              </div>

              <div className="review-card">
                <div className="review-label">📅 Schedule</div>
                <div className="review-value">
                  {form.startDate} {form.startTime && `at ${form.startTime}`}
                </div>
                {form.endDate && (
                  <div className="review-value dim">Ends: {form.endDate} {form.endTime && `at ${form.endTime}`}</div>
                )}
              </div>

              <div className="review-card">
                <div className="review-label">📍 Location</div>
                <div className="review-value">{form.isOnline ? '🌐 Online Event' : form.venue}</div>
                {!form.isOnline && form.city && <div className="review-value dim">{form.city}</div>}
              </div>

              <div className="review-card">
                <div className="review-label">🎟️ Tickets</div>
                <div className="review-value">
                  {form.ticketType}
                  {form.ticketType === 'Paid' && form.ticketPrice && ` · $${form.ticketPrice}`}
                </div>
                <div className="review-value dim">Capacity: {form.capacity} attendees</div>
              </div>
            </div>

            <div className="review-desc-box">
              <div className="review-label" style={{ marginBottom: '0.5rem' }}>📝 Description</div>
              <p>{form.description}</p>
            </div>

            <div className="review-notice">
              <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
              </svg>
              By submitting, you confirm this event complies with our community guidelines.
            </div>
          </div>
        )}

        {/* ── Navigation Buttons ── */}
        <div className="reg-nav-row">
          {step > 0 && (
            <button type="button" className="ghost-btn" onClick={prevStep} disabled={loading}>
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
              Back
            </button>
          )}

          <div style={{ flex: 1 }}></div>

          {step < 3 ? (
            <button type="button" className="submit-btn" style={{ maxWidth: '180px' }} onClick={nextStep}>
              <span>Continue</span>
              <svg className="arrow-icon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          ) : (
            <button
              type="button"
              className="submit-btn"
              style={{ maxWidth: '220px' }}
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? <span className="spinner"></span> : (
                <>
                  <span>Submit Event</span>
                  <svg className="arrow-icon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
